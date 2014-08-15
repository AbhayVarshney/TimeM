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