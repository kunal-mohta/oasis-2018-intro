"use strict";

import "./glitch.scss";
const Promise = require("es6-promise").Promise;

function init() {
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

	// function to create images in HTML
	let mapImages = new Promise(function (resolve) {
		IMAGES.map((obj, index) => createImages(obj, index));
		function createImages(obj, index) {
			let div = document.createElement("div");
			div.classList.add("image");
			div.id = "img" + index;

			let img = document.createElement("img");
			img.setAttribute("src", obj.require());
			img.setAttribute("alt", obj.title);
			img.id = "image" + index;
			div.appendChild(img);

			let h1 = document.createElement("H1");
			h1.innerHTML = obj.title;
			div.appendChild(h1);

			// display none if not first image
			if (index != 0) {
				div.style.opacity = 0;
			}

			CONTAINER.appendChild(div);

			console.log("Image container " + index + " created!");
		}
		resolve();
	});

	mapImages.then(() => {
		let checkState = setInterval(function () {
			// check if the image divs have been mounted to the document
			if (document.readyState === "complete") {
				clearInterval(checkState);
				console.log("Starting anim!");
				// start animation/transition
				startAnim();
			}
		}, 100);


		function startAnim() {
			// set background in the pseudo elements of all containers
			IMAGES.map((obj, index) => {
				let dimensions = getDimensions(index);
				setURL(index, dimensions);
			})

			let currentIndex = 0;
			next();

			// function to go to next image - defined inside startAnim to access currentIndex
			function next() {
				let currDimensions = getDimensions(currentIndex);
				console.log(currDimensions);

				// flickerOut(currentIndex);

				let nextIndex = (++currentIndex) % (IMAGES.length);

				let nextDimensions = getDimensions(nextIndex);
				console.log(nextDimensions);

				// flickerIn(currentIndex);
				// glitch(currentIndex);

				currentIndex = nextIndex;
			}
		}

		function getDimensions(index) {
			let height = document.getElementById("img" + index).clientHeight;
			let width = document.getElementById("img" + index).clientWidth;
			return { height: height, width: width };
		}

		function setURL(index, dimensions) {
			let UID = {
				_current: 0,
				getNew: function () {
					this._current++;
					return this._current;
				}
			};

			HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
				let _this = this;
				let _sheetId = "pseudoStyles";
				let _head = document.head || document.getElementsByTagName('head')[0];
				let _sheet = document.getElementById(_sheetId) || document.createElement('style');
				_sheet.id = _sheetId;
				let className = "pseudoStyle" + UID.getNew();

				_this.className += " " + className;

				_sheet.innerHTML += "\n." + className + ":" + element + "{" + prop + ":" + value + "}";
				_head.appendChild(_sheet);
				return this;
			};

			let div = document.getElementById("img" + index);
			div.pseudoStyle("before", "content", "''");
			div.pseudoStyle("before", "background-image", "url(\"" + IMAGES[index].require() + "\")");
			div.pseudoStyle("before", "height", dimensions.height + "px");
			div.pseudoStyle("before", "width", dimensions.width + "px");
			div.pseudoStyle("before", "background-size", dimensions.width + "px " + dimensions.height + "px");
			div.pseudoStyle("after", "content", "''");
			div.pseudoStyle("after", "background-image", "url(\"" + IMAGES[index].require() + "\")");
			div.pseudoStyle("after", "height", dimensions.height + "px");
			div.pseudoStyle("after", "width", dimensions.width + "px");
			div.pseudoStyle("after", "background-size", dimensions.width + "px " + dimensions.height + "px");
		}

	});


}

init();