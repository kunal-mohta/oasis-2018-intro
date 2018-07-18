"use strict";

//teaser
document.getElementsByClassName("home-teaser")[0].addEventListener("click", function(){
	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
}); 

//brochure
document.getElementsByClassName("about-download")[0].addEventListener("click", function(){
	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
}); 

//days to go
var DDay =  '2018-10-31';
function getTimeRemaining(day){
  var date = Date.parse(day) - Date.parse(new Date());
  var days = Math.floor(date/(1000*60*60*24));
  return days;
}

var x = getTimeRemaining(DDay);
console.log(x);
document.getElementById("days-countdown").innerHTML = x + ' days to go';

//social media
var social = document.getElementsByClassName("social-icon");
social[0].addEventListener("click", function(){
	window.location = "https://www.facebook.com";
});
social[1].addEventListener("click", function(){
	window.location = "https://www.instagram.com";
});
social[2].addEventListener("click", function(){
	window.location = "https://www.twitter.com";
});