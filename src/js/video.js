"use strict";
var modal = document.querySelector(".modal");
var trigger = document.getElementsByClassName("img-thumbnail");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger[0].addEventListener("click", function() {
	var modal_content = document.getElementsByClassName("modal-content");
	var video_1 = document.createElement('iframe');
	video_1.setAttribute("src", "https://www.youtube.com/embed/oWDZY6y7ED8?rel=0");
	video_1.setAttribute("allowfullscreen", "");
	modal_content[0].appendChild(video_1);
	toggleModal();
});
trigger[1].addEventListener("click", function() {
	var modal_content = document.getElementsByClassName("modal-content");
	var video_2 = document.createElement('iframe');
	video_2.setAttribute("src", "https://www.youtube.com/embed/xDyabSZ-nxA?rel=0");
	video_2.setAttribute("allowfullscreen", "");
	modal_content[0].appendChild(video_2);
	toggleModal();
});
trigger[2].addEventListener("click", function() {
	var modal_content = document.getElementsByClassName("modal-content");
	var video_3 = document.createElement('iframe');
	video_3.setAttribute("src", "https://www.youtube.com/embed/FN71wnk58Hg?rel=0");
	video_3.setAttribute("allowfullscreen", "");
	modal_content[0].appendChild(video_3);
	toggleModal();
});
trigger[3].addEventListener("click", function() {
	var modal_content = document.getElementsByClassName("modal-content");
	var video_4 = document.createElement('iframe');
	video_4.setAttribute("src", "https://www.youtube.com/embed/rh7WkyNXNRE?rel=0");
	video_4.setAttribute("allowfullscreen", "");
	modal_content[0].appendChild(video_4);
	toggleModal();
});

window.addEventListener("click", windowOnClick);
