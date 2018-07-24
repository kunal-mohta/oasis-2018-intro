"use strict";
var js_overlay_start = document.getElementsByClassName("js-overlay-start");
var player = document.getElementById("player");
var video_wrapper_ext = document.getElementsByClassName("videoWrapperExt")[0];
var overlay_video = document.getElementsByClassName("overlay-video")[0];

js_overlay_start[0].addEventListener("click", function(e) {
	e.preventDefault();
	var src = this.getAttribute("data-url");
	overlay_video.style.display = "block";
	setTimeout(function() {
		overlay_video.classList.add("o1");
		player.setAttribute("src", src);
	}, 100);
});

js_overlay_start[1].addEventListener("click", function(e) {
	e.preventDefault();
	var src = this.getAttribute("data-url");
	overlay_video.style.display = "block";
	setTimeout(function() {
		overlay_video.classList.add("o1");
		player.setAttribute("src", src);
	}, 100);
});

js_overlay_start[2].addEventListener("click", function(e) {
	e.preventDefault();
	var src = this.getAttribute("data-url");
	overlay_video.style.display = "block";
	setTimeout(function() {
		overlay_video.classList.add("o1");
		player.setAttribute("src", src);
	}, 100);
});

js_overlay_start[3].addEventListener("click", function(e) {
	e.preventDefault();
	var src = this.getAttribute("data-url");
	overlay_video.style.display = "block";
	setTimeout(function() {
		overlay_video.classList.add("o1");
		player.setAttribute("src", src);
		console.log(player.getAttribute("src"));
		console.log("hi");
	}, 100);
});


overlay_video.addEventListener("click", function(event) {
	if (event.target !== video_wrapper_ext) {
		player.setAttribute("src", "https://www.youtube.com/embed/Oi1BcouEmio?rel=0&amp;showinfo=0");
		overlay_video.classList.remove("o1");
		setTimeout(function() {
			overlay_video.style.display = "none";
		}, 600);
	}
});
