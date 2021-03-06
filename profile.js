	
//Returns a printed date that is timeDistance from the current date. This function refers to times in the past
function currentDate(timeDistance){
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate() - timeDistance;
	var year = currentTime.getFullYear()
	document.write(month + "/" + day + "/" + year)
}

//Returns a printed date that is timeDistance from the current date. This function refers to times in the future
function futureDate(timeDistance){
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate() + timeDistance;
	var year = currentTime.getFullYear()
	document.write(month + "/" + day + "/" + year)
}


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