// Clock Js
$(document).ready(function() {
	setInterval( function() {
		var seconds = new Date().getSeconds();
		var sdegree = seconds * 6;
		var srotate = "rotate(" + sdegree + "deg)";

		$("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});

	}, 1000 );


	setInterval( function() {
		var hours = new Date().getHours();
		var mins = new Date().getMinutes();
		var hdegree = hours * 30 + (mins / 2);
		var hrotate = "rotate(" + hdegree + "deg)";

		$("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
	 
	}, 1000 );


	setInterval( function() {
		var mins = new Date().getMinutes();
		var mdegree = mins * 6;
		var mrotate = "rotate(" + mdegree + "deg)";

		$("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
	  
	}, 1000 );
}); 

// Update Clock
function updatingClock(selector, type) {
    function currentDate() {
        var currentDate = new Date;
        var Day = currentDate.getDate();
        if (Day < 10) {
            Day = '0' + Day;
        } //end if
        var Month = currentDate.getMonth() + 1;
        if (Month < 10) {
            Month = '0' + Month;
        } //end if
        var Year = currentDate.getFullYear();
        var fullDate = Month + '/' + Day + '/' + Year;
        return fullDate;
    } //end current date function

    function currentTime() {
        var currentTime = new Date;
        var Minutes = currentTime.getMinutes();
        if (Minutes < 10) {
            Minutes = '0' + Minutes;
        }
        var Hour = currentTime.getHours();
        if (Hour > 12) {
            Hour -= 12;
        } 
         //end if
        var Time = Hour + ':' + Minutes;
        if (currentTime.getHours() <= 12) {
            Time += ' AM';
        } //end if
        if (currentTime.getHours() > 12) {
            Time += ' PM';
        } //end if
        return Time;
    } // end current time function

    function updateOutput() {
        var output;
        if (type == 'time') {
            output = currentTime();
            if ($(selector).text() != output) {
                $(selector).text(output);
            } //end if
        } //end if
        if (type == 'date') {
            output = currentDate();
            if ($(selector).text() != output) {
                $(selector).text(output);
            } //end if
        } //end if
        if (type == 'both') {
            output =  currentTime();
            if ($(selector).text() != output) {
                $(selector).text(output);
            } //end if
        } //end if
    }//end update output function
    updateOutput();
    window.setInterval(function() {
        updateOutput();
    }, 1000); //run update every 1 second
} // end updating clock function
updatingClock('#date-time', 'both');

// Authenticating User to allow user to enter the assignments.html page, logged in
$(document).ready(function(){
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");

	$("#signIn").on('click', function(e){
		e.preventDefault();
		//stores values of username and password
		var username = $("#username").val();
		var password = $("#password").val();
		if(username.length < 0){
		  alert("Please type in your username"); 
		}
		if(password.length < 0){
		  alert("Please type in your password"); 
		}
		authenticateUser(username, password);
	});
	/* Adding Username */
	var makeAssignment,getAssignment;
	//function to find an existing user
	var authenticateUser = function(username, password){
		Parse.User.logIn(username, password, {
			success: function(user) {
			// Do stuff after successful login.
				document.cookie="username=" + username;
				window.location.href = "assignments.html";

			}, error: function(user, error) {
				// The login failed. Check error to see why.
				alert("Incorrect password or username");
			}
		});
	};

	var newUser = function (username, password){
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.signUp(null, {
			success: function(user) {
				// Hooray! Let them use the app now.
				alert("new user has been created", user.get("username"));
			}, error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};
});

// Scrolling feature
$(document).ready(function () {
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 100) {
	        $('.scrollup').fadeIn();
	    } else {
	        $('.scrollup').fadeOut();
	    }
	});
	$('.scrollup').click(function () {
	    $("html, body").animate({
	        scrollTop: 0
	    }, 600);
		return false;
	});
});






