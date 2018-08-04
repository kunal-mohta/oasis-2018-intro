"use strict";

// loader
let loaderWrapper = document.getElementById("loader-wrapper");
let mainLoader = document.getElementById("main-loader");
let oasisTitle = document.getElementsByClassName("oasis-li");
let oasisSlogan = document.getElementById("oasis-slogan");
let oasisText = document.getElementById("oasis-text");
let oasisDate = document.getElementById("oasis-date");
window.onload = function () {
	for(let i=0; i<oasisTitle.length; i++)
		oasisTitle[i].classList.add("title-smoke");
	oasisSlogan.classList.add("slogan-fade-in");
	loaderWrapper.classList.add("wrapper-fade-out");
	mainLoader.classList.add("loader-transition");
	oasisText.classList.add("wrapper-fade-out");
	oasisDate.classList.add("wrapper-fade-out");
	setTimeout(function() {loaderWrapper.style.display = "none";}, 3500);
};

//teaser
document.getElementsByClassName("home-teaser")[0].addEventListener("click", function(){
	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
}); 

//brochure
document.getElementsByClassName("about-download")[0].addEventListener("click", function(){
	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
}); 

//days to go
var DDay =  "2018-10-27";
function getTimeRemaining(day){
	var date = Date.parse(day) - Date.parse(new Date());
	var days = Math.floor(date/(1000*60*60*24));
	if(days<=0){
		document.getElementById("days-countdown").style.display = "none";		
	}
	return days;
}

var x = getTimeRemaining(DDay);
if(x==1)
	document.getElementById("days-countdown").innerHTML = x + " day to go";
else
	document.getElementById("days-countdown").innerHTML = x + " days to go";


//social media
var social = document.getElementsByClassName("social-icon");
social[0].addEventListener("click", function(){
	window.location = "https://www.facebook.com/oasis.bitspilani/";
});
social[1].addEventListener("click", function(){
	window.location = "https://www.instagram.com/bitsoasis/?hl=en";
});
social[2].addEventListener("click", function(){
	window.location = "https://twitter.com/bitsoasis?lang=en";
});