// Authenticating User to allow user to enter the index.html page, logged in 
Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");

$("#signUp").on("click", function(e){
	e.preventDefault();
	newUser($("#inputUsername").val(), $("#inputPassword").val());
})

var newUser = function (username, password){
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	user.signUp(null, {
		success: function(user) {
		// Hooray! Let them use the app now.
		alert("Please sign in with your new user name");
		window.location.href = "landingpage.html";
		}, error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
$("#signUp").on("click", function(e){
	e.preventDefault();
	newUser($("#inputUsername").val(), $("#inputPassword").val());
})

var newUser = function (username, password){
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	user.signUp(null, {
		success: function(user) {
  			// Hooray! Let them use the app now.
  			alert("Please sign in with your new user name");
  			window.location.href = "landingpage.html";
		}, error: function(user, error) {
  			// Show the error message somewhere and let the user try again.
  			alert("Error: " + error.code + " " + error.message);
		}	
	});
}

// Scroll Up Feature
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