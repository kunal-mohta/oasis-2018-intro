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
			colors: ["red", "green", "blue", "yellow", "black", "purple"],
			elemClass: "nav-selected",
			trigger: function(counter){
				const elem = document.getElementsByClassName(this.elemClass)[0];
				elem.style.borderTop = `solid 5px ${this.colors[counter]}`;
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
}

themeChange.triggerChange();
