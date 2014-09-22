
$(document).ready(function(){
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
	 
   $("#addNewAssignment").on('click', function(){

        var username = getUsername();
        var assignment = $("#assignment").val();
        var time = parseInt($("#mins").val());
        createNewAssignment( assignment, username, time);

      });
 
      //  making the list of assignment in the ui from the assignments pulled from the database
      
      var makeAssignmentList = function(username){
        var query = new Parse.Query("Assignment");
        //console.log(query);
        query.equalTo("username", username);
        query.find({
          success: function(results){


            for(var i = 1; i < results.length; i++ ){
              console.log(results[i].get("assignment"));
              var objectId = results[i].id;

              var assignmentList = $("#assignmentList");

              //Query to determine whether or not the Assignment was completed
              var completedQuery = results[i].get("completed");
               
              //Determines date of assignment
              var createdAt = results[i].get("createdAt");
              
              var date = new Date(createdAt);
              var yr = date.getFullYear();
              var mo = date.getMonth() + 1;
              var day = date.getDate();
              var newCreatedAt = yr + '-' + mo  + '-' + day;

              
               //Determines the date today
              var currentDate = new Date()
              var dayToday = currentDate.getDate()
              var month = currentDate.getMonth() + 1
              var year = currentDate.getFullYear()
              var todayDate = year+ '-' + month  + '-' + dayToday

              var tr = $('<tr></tr>');
              //adding assignment id to the row
              $(tr).attr("id", objectId);

              var td = $('<td></td>').text(results[i].get("assignment"));
              var td2 = $('<td></td>').text(results[i].get("time"));
              var td3 =  '<input type="button" value="Start" id="countDown">';
              var td4 = '<input type="button" value="Stop" id="pause">'
              var td5 = '<input onload="reset()" type="button" value="Reset" onclick="reset()">'
              var text = "<td><span style='color:green'>Completed</span></td>";
              var btn = '<td><button class="done-button" type="button"> Done</button></td>';
              
              //If the Assignment is marked complete (i.e marked as a one in Parse)
              if(completedQuery == 0){
                $(tr).append(td);
                $(tr).append(td2);
                $(tr).append(td3);
                $(tr).append(td4);
                $(tr).append(td5);


              //This is the date that the assignment is added to Parse

                    var seconds = results[i].get("time");
                 
                    var t;
                    var count = results[i].get("time");


              $("#countDown").on('click', function(){
                  
                  if (count === 0) {
                      // time is up
                  } else {
                      count--;
                      console.log(count);
                      t = setTimeout(this.function, 1000);
                  }
              });
              
              $("#pause").on('click',function(){
                  // pauses countdown
                  clearTimeout(t);
              });
              
              $("#reset").on('click', function(){
                  // resets countdown
                  pause();
                  count = seconds;
                  //cddisplay();
              });
            
              
              if (results[i].get("completed") == 1){
                $(tr).append(text);
              }
              else{
                $(tr).append(btn);
              }
              
            
              assignmentList.append(tr);
             } 
            }

          },
          error: function( assignment,error) {
              // Show the error message somewhere and let the user try again.
              alert("Error: " + error.code + " " + error.message);

            }
          });
      };


        //Function for creating a new assignment and adding to the database
        var createNewAssignment = function (assignmentName, username, time){
          var Assignment = Parse.Object.extend("Assignment");

          //Creating a new instance of the class
          var assignment = new Assignment();
          
          var _assignmentName = assignmentName;
          var _time = time;
          var assignment_data = {assignment: _assignmentName, username: username, time: _time, completed: 0};

          /* Save the Assignment */

          assignment.save(assignment_data, 
            {success: function(assignment) {
              //add the newly created assignment to the bottom of the table
             
                  var assignmentList = $("#assignmentList");
                  var tr = $('<tr></tr>');
                  var td = $('<td></td>').text(assignment.get("assignment"));
                  var td2 = $('<td></td>').text(assignment.get("time"));
                  var td3 = $('<td></td>').text(assignment.get("time"));

                  var btn = '<td><button class="done-button" type="button"> Done</button></td>'
                  
                  $(tr).append(td);
                  $(tr).append(td2);
                  $(tr).append(td3);
                  $(tr).append(btn);
                  assignmentList.append(tr);

                  //empty the asisgnment name and time from the new assignment form
                  $("#assignment").val("");
                  $("#mins").val("");
                
            },
            error: function( assignment,error) {
              // Show the error message somewhere and let the user try again.
              alert("Error: " + error.code + " " + error.message);

            }
          });
            //things to do after the save takes place
          };

          var getUsername = function (){
            var half = (document.cookie).substring(9);
            var array = (half).split(";");
            var username = array[0];
            alert(username);
            return username;

          };


          var username = getUsername();
          makeAssignmentList(username);

            var done= document.getElementById('done-button');
            console.log(done);

            $(".done-button").click(function(){
              alert(clicked);
            });

      /*
            $(".done-button").on('click', function(){
                alert("done clicked");
                //var parent = this.parent.append("<span>Completed</span>")
                //this.fadeOut();
              });
            });*/
           $(document).on('click', "button.done-button", function() {


              var assignmentName = $(this).parent().parent().children(":first").html();
              console.log(assignmentName);

              //replace the button with text that says "completed"
              $(this).replaceWith("<span style='color:green'>Completed</span>"); 
              //var parent = $(this).parent().append("<span style='color:green'>Completed</span>")
                

              //in the database change completed status to 1
              var query = new Parse.Query("Assignment");
              query.equalTo("assignment", assignmentName);
              query.first({
               success: function(assignment){
                  console.log(assignment);
                //updating the completed column for this assingment
                  assignment.save({completed:1}, {
                    success: function() {
                      console.log("assginment has been updated with completed=1");
                    }
                });
              },
              error: function( assignment,error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);

                }
              });
          });


	$("#saveButton").on('click', function wakeUpTime(){
		var wakeUpHR = $("wakeUpHR option:selected").text();
		console.log(wakeUpHR);
	});
/*
	function changeThis() {
        var assignmentInput = document.getElementById('assignment');
        document.getElementById('newAssign').innerHTML = assignmentInput.value;
        var minsInput = document.getElementById('mins');
        document.getElementById('newMins').innerHTML = minsInput.value;
    }
    changeThis();
    */

    $(".btnIncrementTime").on('click', function(){
    	// call parse and increment time
    	var min = $(this).data("min");
    	 var query = new Parse.Query("Assignment");
    	 query.equalTo("assignment", "Calculus HW");
              query.first({
               success: function(assignment){
               	var initialTime = assignment.get('time');
               	console.log("initial time is " + initialTime );
               	var newTime = initialTime + min;
        		console.log("newtime is " + newTime);
                //updating the completed column for this assingment
                assignment.set("time", newTime);
                assignment.save(null, {
                  success: function(assignment) {
                    //update the html
                    var id = assignment.id;
                    var timeElement = $("#" + id).children().eq(1);
                    $(timeElement).text(assignment.get('time'));

                  },
                  error: function(assignment) {
                    // don't update
                  }
                });
              },
              error: function( assignment,error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);

                }
              });

    })
});
     