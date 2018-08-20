"use strict";

import Axios from "axios";
// import {disableSubmitButton} from "./prereg";
import { openPreregDialogMsg, disableSubmitButton, enableSubmitButton } from "./prereg";
// import enableSubmitButton from "./prereg";

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
	oasisText.classList.add("text-fade-out");
	oasisDate.classList.add("text-fade-out");
    setTimeout(function() {loaderWrapper.style.display = "none";}, 3500);

    /* College List (load after laoder ends)*/
    let preregClg = document.getElementById("prereg-input-college");
    const URL = "https://bits-oasis.org/2018/registrations/intro/";

    disableSubmitButton();

    let loadingClg = document.createElement("option");
    loadingClg.setAttribute("value", "");
    loadingClg.innerHTML = "Loading...";

    preregClg.appendChild(loadingClg);

    Axios(
        {
            method: "get",
            url: URL,
        }
    )
    .then(
        (response) => {

            loadingClg.parentElement.removeChild(loadingClg);
            enableSubmitButton();

            if (response.status === 200) {
                let collegeArray = response.data;

                collegeArray.forEach(
                    college => {
                        let newOption = document.createElement("option");
                        newOption.setAttribute("value", college.name);
                        newOption.innerHTML = college.name;

                        preregClg.appendChild(newOption);
                    }
                );
            }
        }
    )
    .catch(
        (error) => {
            console.log(error);

            loadingClg.parentElement.removeChild(loadingClg);
            openPreregDialogMsg("Error ocurred! Please try again later");
        }
    );
};

//teaser
// document.getElementsByClassName("home-teaser")[0].addEventListener("click", function(){
// 	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
// }); 

//brochure
// document.getElementsByClassName("about-download")[0].addEventListener("click", function(){
// 	window.location = "https://www.youtube.com/watch?v=oWDZY6y7ED8";
// }); 

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
// var social = document.getElementsByClassName("social-icon");
// social[0].addEventListener("click", function(){
// 	window.location = "https://www.facebook.com/oasis.bitspilani/";
// });
// social[1].addEventListener("click", function(){
// 	window.location = "https://www.instagram.com/bitsoasis/?hl=en";
// });
// social[2].addEventListener("click", function(){
// 	window.location = "https://twitter.com/bitsoasis?lang=en";
// });
