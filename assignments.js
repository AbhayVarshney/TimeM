$(document).ready(function(){
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");

//Returns the Username of the current user by accessing a cookie
	var getUsername = function (){
		var half = (document.cookie).substring(9);
		var array = (half).split(";");
		var username = array[0];

		return username;
	}

//Returns user to registration if no username/cookie present
  var username = getUsername();
  if (username == "") {
	 console.log("Username not found");
	 window.location.replace("registration.html");
	 //document.location = "registration.html";
  }
  
  var currentAssignmentId;
	 
  $("#" + currentAssignmentId).addClass();

  //Creates a New assignment
  $("#addNewAssignment").on('click', function(){

    var username = getUsername();
    var assignment = $("#assignment").val();
    var time = parseInt($("#mins").val());
    createNewAssignment( assignment, username, time);

  });


  //  making the list of assignment in the ui from the assignments pulled from the database
  var createNewTR = function (result, objectId){
    var tr = $('<tr></tr>');
     //adding assignment id to the row
     $(tr).attr("id", objectId);

     //Table element values
     var td = $('<td></td>').text(result.get("assignment"));
     var td2 = $('<td></td>').text(result.get("time"));
     var td3 =  '<input type="button" value="Start" id="countDown">';
     var td4 = '<input type="button" value="Stop" id="pause">'
     var td5 = '<input onload="reset()" type="button" value="Reset" onclick="reset()">'
     var text = "<td><span style='color:green'>Completed</span></td>";
     var btn = '<td><button class="done-button" type="button"> Done</button></td>';
     
    //This makes the list in the table
      $(tr).append(td);
      $(tr).append(td2);
      $(tr).append(td3);
      $(tr).append(td4);
      $(tr).append(td5);

      //This is the date that the assignment is added to Parse
      var seconds = result.get("time");
      
      var t;
      var count = result.get("time");

      
      if (result.get("completed") == 1){
        $(tr).append(text);
      }
      else{
        $(tr).append(btn);
      }
    
      $("#assignmentList").append(tr);
      
  }
  

  var makeAssignmentList = function(username){
    var query = new Parse.Query("Assignment");
    //console.log(query);
    query.equalTo("username", username);
    query.equalTo("completed", 0);
    query.find({
  	  success: function(results){
    	  for(var i = 1; i < results.length; i++ ){
      	   console.log(results[i].get("assignment"));
      	   var objectId = results[i].id;

      	   

      	   //Query to determine whether or not the Assignment was completed
      	   var completedQuery = results[i].get("completed");
      	    
      	   //Determines date of assignment
      	   var createdAt = results[i].get("createdAt");
      	   
      	   var date = new Date(createdAt);
      	   var yr = date.getFullYear();
      	   var mo = date.getMonth() + 1;
      	   var day = date.getDate();
      	   var newCreatedAt = yr + '-' + mo  + '-' + day;

           createNewTR(results[i], objectId);
    	   
    	   }
  	   },
    	error: function( assignment,error) {
    		// Show the error message somewhere and let the user try again.
    		console.log("Error: " + error.code + " " + error.message);
      }
    });
  };

  var todayDate = function(){
  		   //Determines the date today
	   var currentDate = new Date();
	   var dayToday = currentDate.getDate();
	   var month = currentDate.getMonth() + 1;
	   var year = currentDate.getFullYear();
	   var todayDate = year+ '-' + month  + '-' + dayToday;
	   return todayDate;
  }


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


	 },
	 error: function( assignment,error) {
	   // Show the error message somewhere and let the user try again.
	   console.log("Error: " + error.code + " " + error.message);

	 }
    });
	 //things to do after the save takes place
    };
    
    var username = getUsername();
    makeAssignmentList(username);

    var done= document.getElementById('done-button');
    console.log(done);

    $(".done-button").click(function(){
	     console.log(clicked);
    });

	 /*
		  $(".done-button").on('click', function(){
			 alert("done clicked");
			 //var parent = this.parent.append("<span>Completed</span>")
			 //this.fadeOut();
		    });
    });
$(document).on('click', "button.done-button", function() {
}
*/
function init_Countdown( assignment , time) {
      //Gets the total time and assignment from the makeAssignmentList function
      var assignment_CountDown = assignment;
      var totalTime = time;

      //Converts to time from minutes to seconds
      seconds = totalTime*60;
    

  /* var Assignment = Parse.Object.extend("Assignment");

  var query = new Parse.Query(Assignment);
  query.equalTo("username", getUsername);
  
  query.first({
    success: function (object) {
	 // Do something with the returned Parse.Object values
	 console.log(object);
	   totalTime = object.get('time');
	   console.log(object)

    },
    error: function(error) {
	 
    }
  });
*/
  
}


function countdown() {
		// starts countdown
		
		countDisplay();
		  
		if (count == 0) {
		    // time is up
		} else {
		    count--;
		    t = setTimeout("countdown()", 1000);
		}
	 };

function countDisplay() {
    // displays time in span
    //document.getElementById('timespan').innerHTML = count;
};



function pause() {
  var t = 0;
    // pauses countdown
    clearTimeout(t); 
};

function reset() {
    // resets countdown
    pause();
    count = seconds;
    countDisplay();
};


  init_Countdown();
  reset();


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
          console.log("Error: " + error.code + " " + error.message);
        }
      });
  });
});

