const themeChange = {
	
	totalThemes: 6,

	currentThemeCounter: 0,

	incrementThemeCounter: function(){
		this.currentThemeCounter = ++this.currentThemeCounter % this.totalThemes;
	},

	//Changes -> Array of changes to be implemented on the next theme change
	//Each change should have a trigger function which is to be actually called
	//on the theme change
	//The parameter passed to each trigger function is the currentThemeCounter

	changes: [
		{
			//colors: ["#32b849", "#d65804", "#87ceeb", "#df1414"], // rock, hippie, lgbt, punk
			colors: ["#2D8ED8", "black", "#df1414", "#d65804", "#F0DF00", "#87ceeb" ],
			// elems
			elemClass: "nav-selected",
			elem2Class: "mobile-nav-selected",
			elem3Id: "theme-scroll",

			// text
			elem4Class: "theme-color-text",
			trigger: function(counter){
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
			}
		},
		{
			//hueRotate: ["259deg", "170deg", "306deg", "120deg"], // rock, hippie, lgbt, punk
			hueRotate: [0, 45, 120, 143, 180, 306], // goth, rock, punk, hippie, aghori, lgbt
			elemClass: "main-container-background",
			elem2Class: "main-wrapper-background",
			cycleCounter: 0,
			trigger: function(counter){
				if(!counter) ++this.cycleCounter;
				const hueRotateVal = this.cycleCounter * 360 + this.hueRotate[counter];

				const contentBg = document.getElementsByClassName(this.elemClass)[0];
				contentBg.style.filter = `hue-rotate(${hueRotateVal}deg)`;

				const mainBg = document.getElementsByClassName(this.elem2Class)[0];
				mainBg.style.filter = `hue-rotate(${hueRotateVal}deg)`;
			}
		}
	],

	//TimeLapse between 2 theme change
	timeLapse: 2000, //In millisecond

	//Function to trigger the themeChange and also increment the theme counter
	triggerChange: function(){
		setInterval( () => {
			this.incrementThemeCounter();
			this.changes.forEach(change => change.trigger(this.currentThemeCounter));
		}, this.timeLapse);
	}
};

themeChange.triggerChange();

/* exporting themeChange object
 * import in tabNavigation.js
 * to keep track of the current theme color
 */
module.exports = themeChange;
