		




	function fourDaysAgo(){
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate() - 4
		var year = currentTime.getFullYear()
		document.write(month + "/" + day + "/" + year)
	}


	function threeDaysAgo(){
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate() - 3
		var year = currentTime.getFullYear()
		document.write(month + "/" + day + "/" + year)
	}


	function twoDaysAgo(){
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate() - 2
		var year = currentTime.getFullYear()
		document.write(month + "/" + day + "/" + year)
	}


	function oneDayAgo(){
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate() - 1
		var year = currentTime.getFullYear()
		document.write(month + "/" + day + "/" + year)
	}

	function currentDate(){
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate()
		var year = currentTime.getFullYear()
		document.write(month + "/" + day + "/" + year)
	}
