$(document).ready(function(){

var totalTime = 35;
var getTime;
var t;
var count;
var abhay;
var seconds;
		
function init() {
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");

  	var username = document.cookie;

  	var Assignment = Parse.Object.extend("Assignment");
	var query = new Parse.Query(Assignment);
	query.equalTo("username", username);
	
	query.first({
	  success: function (object) {
	    // Do something with the returned Parse.Object values
	      totalTime = object.get('time');
	      console.log(object)

	  },
	  error: function(error) {
	    
	  }
	});
	seconds = totalTime*60;
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
    document.getElementById('timespan').innerHTML = count;
};



function pause() {
    // pauses countdown
    clearTimeout(t); 
};

function reset() {
    // resets countdown
    pause();
    count = seconds;
    countDisplay();
};


	init();
	reset();

});
