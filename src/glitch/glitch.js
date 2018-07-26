"use strict";

import "./glitch.scss";

function init () {
	const IMAGES = [
		{
			name: "1.png",
			title: "punk"
		},
		{
			name: "2.png",
			title: "aghori"
		},
		{
			name: "3.png",
			title: "goth"
		},
		{
			name: "4.png",
			title: "lgbt"
		},
		{
			name: "5.png",
			title: "rock"
		},
		{
			name: "6.png",
			title: "hippie"
		}
	];

	const BASE_PATH = "../assets/imgs/";
	const CONTAINER = document.getElementById("container");

	IMAGES.map(obj => createImages(obj));


	// function to create images in HTML
	function createImages (obj) {
		let div = document.createElement("div");
		div.classList.add("image");

		let img = document.createElement("img");
		img.setAttribute("src", require(BASE_PATH+obj.name));
		img.setAttribute("alt", obj.title);
		div.appendChild(img);
		
		let h1 = document.createElement("H1");
		h1.innerHTML = obj.title;
		div.appendChild(h1);

		CONTAINER.appendChild(div);
	}
}

init();