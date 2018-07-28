"use strict";

import "./glitch.scss";

function init () {
	const IMAGES = [
		{
			name: "1.png",
			title: "punk",
			require: () => require("../assets/imgs/1.png")
		},
		{
			name: "2.png",
			title: "aghori",
			require: () => require("../assets/imgs/2.png")
		},
		{
			name: "3.png",
			title: "goth",
			require: () => require("../assets/imgs/3.png")
		},
		{
			name: "4.png",
			title: "lgbt",
			require: () => require("../assets/imgs/4.png")
		},
		{
			name: "5.png",
			title: "rock",
			require: () => require("../assets/imgs/5.png")
		},
		{
			name: "6.png",
			title: "hippie",
			require: () => require("../assets/imgs/6.png")
		}
	];

	const CONTAINER = document.getElementById("container");

	IMAGES.map((obj, index) => createImages(obj, index));


	// function to create images in HTML
	function createImages (obj, index) {
		let div = document.createElement("div");
		div.classList.add("image");

		let img = document.createElement("img");
		img.setAttribute("src", obj.require());
		img.setAttribute("alt", obj.title);
		div.appendChild(img);
		
		let h1 = document.createElement("H1");
		h1.innerHTML = obj.title;
		div.appendChild(h1);

		// display none if not first image
		if(index!=0) {
			div.style.display = 'none';
			div.style.opacity = 0;
		}

		CONTAINER.appendChild(div);
	}
}

init();