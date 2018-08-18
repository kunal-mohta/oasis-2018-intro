const themeChange = {

	totalThemes: 6,

	currentThemeCounter: 0,

	incrementThemeCounter: function () {
		this.currentThemeCounter = ++this.currentThemeCounter % this.totalThemes;
	},

	//Changes -> Array of changes to be implemented on the next theme change
	//Each change SHOULD have a trigger function which is to be actually called
	//on the theme change

	changes: [
		{
			//colors: ["#32b849", "#d65804", "#87ceeb", "#df1414"], // rock, hippie, lgbt, punk
			colors: ["#2D8ED8", "#EF5FDE", "#df1414", "#d65804", "#F0DF00", "#87ceeb"],
			// elems
			elemClass: "nav-selected",
			elem2Class: "mobile-nav-selected",
			elem3Id: "theme-scroll",

			// text
			elem4Class: "theme-color-text",
			trigger: function (counter) {
				const elem = document.getElementsByClassName(this.elemClass)[0];
				elem.style.borderTop = `solid 5px ${this.colors[counter]}`;
				elem.style.color = `${this.colors[counter]}`;

				const elem2 = document.getElementsByClassName(this.elem2Class)[0];
				elem2.style.color = `${this.colors[counter]}`;

				const elem3 = document.getElementById(this.elem3Id);
				elem3.style.borderLeft = `solid 5px ${this.colors[counter]}`;
				elem3.style.color = `${this.colors[counter]}`;

				const textElems = document.getElementsByClassName(this.elem4Class);
				Array.from(textElems).forEach(
					(elem) => {
						elem.style.color = this.colors[counter];
					}
				);

				const themeScroll = document.getElementById("theme-scroll");
				themeScroll.className = "theme-scroll-anim";
				setTimeout(function () { themeScroll.className = ""; }, 4000);
			}
		},
		{
			//hueRotate: ["259deg", "170deg", "306deg", "120deg"], // rock, hippie, lgbt, punk
			hueRotate: [0, 45, 120, 143, 180, 306], // goth, rock, punk, hippie, aghori, lgbt
			elemClass: "main-container-background",
			elem2Class: "main-wrapper-background",
			cycleCounter: 0,
			trigger: function (counter) {
				if (!counter)++this.cycleCounter;
				const hueRotateVal = this.cycleCounter * 360 + this.hueRotate[counter];

				const contentBg = document.getElementsByClassName(this.elemClass)[0];
				contentBg.style.filter = `hue-rotate(${hueRotateVal}deg)`;

				const mainBg = document.getElementsByClassName(this.elem2Class)[0];
				mainBg.style.filter = `hue-rotate(${hueRotateVal}deg)`;
			}
		},
		{
			setup: function(totalThemes){
				//console.log(this);
				const themeScrollIW = document.getElementById("theme-scroll-innerwrap");
				for(let i = 0; i < totalThemes; ++i){
					const div = document.createElement("div");
					const textNode = document.createTextNode(
						`${i < 9 ? "0" :  ""}${i+1}`
					);
					div.className = "theme-number";
					div.appendChild(textNode);
					themeScrollIW.appendChild(div);
				}
				const themeNumbers = document.getElementsByClassName("theme-number");
				const a = [1, 4, 3, 1, 3];
				let k = 0;
				for(let i=0; i<themeNumbers.length; i++) {
					themeNumbers[i].addEventListener("click", function () {
						if(i+1==a[k]) {
							k++;
							console.log(k);
						} else {
							k=0;
						}
						
						if(k==5) {
							document.getElementById("hot-container").style.display = "flex";
							document.getElementById("hot-img").style.display = "block";
							document.getElementById("hot-container").className = "hot-container-flicker";
							document.getElementById("hot-img").className = "hot-image-anim";
							document.getElementById("main-body").style.zIndex = 1;
							setTimeout(function(){
								document.getElementById("hot-container").style.display = "none";
								document.getElementById("hot-img").style.display = "none";
								document.getElementById("hot-container").className = "";
								document.getElementById("hot-img").className = "";
								document.getElementById("main-body").style.zIndex = 999;
							}, 2100);
							k=0;
						}
					});
				}
				themeNumbers[0].style.opacity = "1";
			},
			trigger: function(counter){
				const themeNumbers = document.getElementsByClassName("theme-number");	
				Array.from(themeNumbers).forEach(elem => elem.style.opacity = "");
				themeNumbers[counter].style.opacity = "1";
			}
		}
	],

	//TimeLapse between 2 theme change
	timeLapse: 6000, //In millisecond

	//Function to trigger the themeChange and also increment the theme counter
	triggerChange: function () {
		setInterval(() => {
			this.incrementThemeCounter();
			this.changes.forEach(change => change.trigger(this.currentThemeCounter));
		}, this.timeLapse);
	}
};


/* exporting themeChange object
 * import in tabNavigation.js
 * to keep track of the current theme color
 */
module.exports = themeChange;

// JS for glitch

"use strict";

function init() {
	// Edit this to change tjhe transition duration (in seconds)
	const TRANSITION_DURATION = 6;

	let PSEUDO_COUNT = 0;
	const ANIMATION_DURATION = 2.5;

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
	const CONTAINER = document.getElementById("image-container");

	// function to create images in HTML
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

		// let h1 = document.createElement("H1");
		// h1.innerHTML = obj.title;
		// div.appendChild(h1);

		// display none if not first image
		if (index != 0) {
			div.style.opacity = 0;
		}

		CONTAINER.appendChild(div);
	}

	let checkState = setInterval(function () {
		// check if the image divs have been mounted to the document
		if (document.readyState === "complete") {
			clearInterval(checkState);
			// start animation/transition
			themeChange.triggerChange();
			themeChange.changes[2].setup(themeChange.totalThemes);
			startAnim();
		}
	}, 100);


	function startAnim() {
		// set background in the pseudo elements of all containers
		IMAGES.map((obj, index) => {
			let dimensions = getDimensions(index);
			setURL(index, dimensions);
		});

		let currentIndex = 0;
		setTimeout(next, 4750);
		let isFirst = true;

		// function to go to next image - defined inside startAnim to access currentIndex
		function next() {
			animateOut(currentIndex, ANIMATION_DURATION);

			let nextIndex = (++currentIndex) % (IMAGES.length);
			animateIn(nextIndex, ANIMATION_DURATION);

			currentIndex = nextIndex;
			if (isFirst) {
				setInterval(next, TRANSITION_DURATION * 1000);
				isFirst = false;
			}
		}

		// get viewport current dimensions
		let dimensions = {
			w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
		setInterval(function () {
			let newWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			let newHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			if (newWidth !== dimensions.w || newHeight !== dimensions.h) {
				dimensions.w = newWidth;
				dimensions.h = newHeight;
				for(let i = 0; i<IMAGES.length; i++)
					setDimension(i, getDimensions(i));
			}
		}, 500);
	}

	function getDimensions(index) {
		let height = document.getElementById("img" + index).clientHeight;
		let width = document.getElementById("img" + index).clientWidth;
		return { height: height, width: width };
	}

	function setURL(index, dimensions) {
		let UID = {
			getNew: function () {
				PSEUDO_COUNT++;
				return PSEUDO_COUNT;
			}
		};

		HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
			let _this = this;
			let _sheetId = "pseudoStyles";
			let _head = document.head || document.getElementsByTagName("head")[0];
			let _sheet = document.getElementById(_sheetId) || document.createElement("style");
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

	function setDimension(index, dimensions) {
		let UID = {
			getNew: function () {
				PSEUDO_COUNT++;
				return PSEUDO_COUNT;
			}
		};

		HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
			let _this = this;
			let _sheetId = "pseudoStyles";
			let _head = document.head || document.getElementsByTagName("head")[0];
			let _sheet = document.getElementById(_sheetId) || document.createElement("style");
			_sheet.id = _sheetId;
			let className = "pseudoStyle" + UID.getNew();

			_this.className += " " + className;

			_sheet.innerHTML += "\n." + className + ":" + element + "{" + prop + ":" + value + "}";
			_head.appendChild(_sheet);
			return this;
		};

		let div = document.getElementById("img" + index);
		div.pseudoStyle("before", "content", "''");
		div.pseudoStyle("before", "height", dimensions.height + "px");
		div.pseudoStyle("before", "width", dimensions.width + "px");
		div.pseudoStyle("before", "background-size", dimensions.width + "px " + dimensions.height + "px");
		div.pseudoStyle("after", "content", "''");
		div.pseudoStyle("after", "height", dimensions.height + "px");
		div.pseudoStyle("after", "width", dimensions.width + "px");
		div.pseudoStyle("after", "background-size", dimensions.width + "px " + dimensions.height + "px");
	}

	function animateIn(index, duration) {
		let UID = {
			getNew: function () {
				PSEUDO_COUNT++;
				return PSEUDO_COUNT;
			}
		};

		HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
			let _this = this;
			let _sheetId = "pseudoStyles";
			let _head = document.head || document.getElementsByTagName("head")[0];
			let _sheet = document.getElementById(_sheetId) || document.createElement("style");
			_sheet.id = _sheetId;
			let className = "pseudoStyle" + UID.getNew();

			_this.className += " " + className;

			_sheet.innerHTML += "\n." + className + ":" + element + "{" + prop + ":" + value + "}";
			_head.appendChild(_sheet);
			return this;
		};

		let div = document.getElementById("img" + index);

		// flicker in
		div.classList.add("imageFlickerIn");
		setTimeout(function () {
			div.style.opacity = 1;
			div.classList.remove("imageFlickerIn");
		}, 3000);

		// glitch
		div.pseudoStyle("before", "animation", "noise-anim " + duration + "s linear alternate-reverse");
		let beforePseudoCount = PSEUDO_COUNT;
		setTimeout(function () { div.classList.remove("pseudoStyle" + beforePseudoCount); }, duration * 1000);

		div.pseudoStyle("after", "animation", "noise-anim " + duration + "s linear alternate-reverse");
		let afterPseudoCount = PSEUDO_COUNT;
		setTimeout(function () { div.classList.remove("pseudoStyle" + afterPseudoCount); }, duration * 1000);
	}

	function animateOut(index, duration) {
		let UID = {
			getNew: function () {
				PSEUDO_COUNT++;
				return PSEUDO_COUNT;
			}
		};

		HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
			let _this = this;
			let _sheetId = "pseudoStyles";
			let _head = document.head || document.getElementsByTagName("head")[0];
			let _sheet = document.getElementById(_sheetId) || document.createElement("style");
			_sheet.id = _sheetId;
			let className = "pseudoStyle" + UID.getNew();

			_this.className += " " + className;

			_sheet.innerHTML += "\n." + className + ":" + element + "{" + prop + ":" + value + "}";
			_head.appendChild(_sheet);
			return this;
		};

		let div = document.getElementById("img" + index);

		// flicker out
		div.classList.add("imageFlickerOut");
		setTimeout(function () {
			div.style.opacity = 0;
			div.classList.remove("imageFlickerOut");
		}, 1500);

		// glitch
		div.pseudoStyle("before", "animation", "noise-anim " + duration + "s linear alternate-reverse");
		let beforePseudoCount = PSEUDO_COUNT;
		setTimeout(function () { div.classList.remove("pseudoStyle" + beforePseudoCount); }, duration * 1000);

		div.pseudoStyle("after", "animation", "noise-anim " + duration + "s linear alternate-reverse");
		let afterPseudoCount = PSEUDO_COUNT;
		setTimeout(function () { div.classList.remove("pseudoStyle" + afterPseudoCount); }, duration * 1000);

	}
}

init();