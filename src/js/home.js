document.getElementsByClassName("home-teaser")[0].addEventListener("click", function(){
	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
}); 

document.getElementsByClassName("about-download")[0].addEventListener("click", function(){
	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
}); 

var DDay =  '2018-10-31';
function getTimeRemaining(day){
  var date = Date.parse(day) - Date.parse(new Date());
  var days = Math.floor(date/(1000*60*60*24));
  return days;
}

var x = getTimeRemaining(DDay);
console.log(x);
document.getElementById("days-countdown").innerHTML = x + ' days to go';