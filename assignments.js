/*
var assignment = function(id) {
  var assign = {};

  assign.element = document.createElement("div");

  assign.show = function() {
    assign.element.style.display = "block";
  };

  assign.addTo = function(list) {

  };

  assign.onName = function(k) {
    Parse(function() {
      if (! error) k();
    })
  };

  // var x = assignment(123)
  // x.addTo()

  assign.add = function() {

  };

  return assign;
};

var assignmentList = function(id) {
  var list = {};

  list.children = [];

  list.each = function(k) {

  };
};
*/

//Put Slide In code into this function
// This will hide all the rows except the one that the user clicked
var hideInactiveAssignments = function(node) {
     $("#assignmentList tr").each(function(el){
      if ($(this).attr("id") !== $(node).parent().attr("id")){
        $(this).hide();
      }
    })
}

var showInactiveAssignemnts = function(node) {
  $("#assignmentList tr").each(function(el){
    $(this).show();
  });
}

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
     var td2 = $('<td></td`>').text(result.get("time"));
     // Start Button
     var td3 = '<input type="button" value="Start" id="countDown" class="remoteButtons" onclick="hideInactiveAssignments(this)">';
     // Stop Button
     var td4 = '<input type="button" value="Stop" id="pause" class="remoteButtons" onclick="showInactiveAssignemnts(this)" >';
    
     
    //This makes the list in the table
      $(tr).append(td);
      $(tr).append(td2);
      $(tr).append(td3);
      $(tr).append(td4);

      //This is the date that the assignment is added to Parse
      var seconds = result.get("time");
      
      var t;
      var count = result.get("time");

    
      $("#assignmentList").append(tr);
      
  }

//Makes the Assignment list by searching for items in parse given the username
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
      	   
           // gets the date of assignment in the format below
      	   var date = new Date(createdAt);
      	   var yr = date.getFullYear();
      	   var mo = date.getMonth() + 1;
      	   var day = date.getDate();
      	   var newCreatedAt = yr + '-' + mo  + '-' + day;

           //Adds values to the other table values
           createNewTR(results[i], objectId);
    	   
    	   }
  	   },
    	error: function( assignment,error) {
    		// Show the error message somewhere and let the user try again.
    		console.log("Error: " + error.code + " " + error.message);
      }
    });
  };

//Returns the date today
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

     var assignmentList = $("#assignmentList");
     assignmentList.html("");
     makeAssignmentList(username);




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

/* THIS IS THE TIMER */
$("#countDown").on("click", function(){
  //make sures that the countdown has been clicked
  alert("has been clicked");
  alert("Wait 5 sec");
    //newUser($("#inputUsername").val(), $("#inputPassword").val());
  
})
/* END TIMER OPERATIONS ********/
//Saves the time stored for wake up hour
	$("#saveButton").on('click', function wakeUpTime(){
		var wakeUpHR = $("wakeUpHR option:selected").text();
		console.log(wakeUpHR);
	});

//Adds time to assignment 
//These are the buttons at the bottom of the page
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

