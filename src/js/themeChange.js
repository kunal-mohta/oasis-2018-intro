const themeChange = {
	
	totalThemes: 3, 

	currentThemeCounter: 0,

	incrementThemeCounter: function(){
		this.currentThemeCounter = ++this.currentThemeCounter % this.totalThemes;
	},

	//Changes -> Array of changes to be implemented on the next theme change
	//Each change SHOULD have a trigger function which is to be actually called
	//on the theme change

	changes: [
		{
			colors: ["#32b849", "#d65804", "#87ceeb"], // rock, hippie, lgbt
			elemClass: "nav-selected",
			trigger: function(counter){
				const elem = document.getElementsByClassName(this.elemClass)[0];
				elem.style.borderTop = `solid 5px ${this.colors[counter]}`;
			}
		},
		{
			hueRotate: ["259deg", "170deg", "306deg"], // rock, hippie, lgbt
			saturate: ["61.5%", "100%", "100%"], // rock, hippie, lgbt
			elemClass: "main-container-background",
			trigger: function(counter){
				const contentBg = document.getElementsByClassName(this.elemClass)[0];
				contentBg.style.filter = "hue-rotate(" + this.hueRotate[counter] + ") saturate(" + this.saturate[counter] + ")";
			}
		},
		{
			setup: function(){
				console.log(this);
				const themeScrollIW = document.getElementById("theme-scroll-innerwrap");
				for(let i = 0; i < this.totalThemes; ++i){
					const div = document.createElement("div");
					const textNode = document.createTextNode(
					`${i < 9 ? "0" :  ""}${i+1}`);
					div.className = "theme-number";
					div.appendChild(textNode);
					themeScrollIW.appendChild(div);
				}
				const themeNumbers = document.getElementsByClassName("theme-number");	
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
/*PLEASE CHANGE THE INDEX ACCORDINGLY TO KEEP TRACK*/
themeChange.changes[2].setup.apply(themeChange)

/* exporting themeChange object
 * import in tabNavigation.js
 * to keep track of the current theme color
 */
module.exports = themeChange;
