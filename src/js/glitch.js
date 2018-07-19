"use strict"

export default ({
	elem = document.createElement('img'),
	images = []
} = {}) => {
	//PRIVATE FUNCTIONS

	const noOfImages = images.length;
	let currentIndex = 0; 
	
	//PUBLIC FUNCTIONS
	const next = () => {
		//Change the current index
		++currentIndex;
		currentIndex = currentIndex < noOfImages ? currentIndex : 0;

		//Show the animation on the element
	}

	const previous = () => {
		//Change the current index
		--currentIndex;
		currentIndex = currentIndex > -1 ? currentIndex : noOfImages-1;
	
		//Show the animation on the element
	}

	const goto = index => {
		//Change the current index
		if(index < 0 || index >= noOfImages) throw Error("Index out of bounds");

		currentIndex = index;	
		
		//Show the animation on the element
	}

	return {
		elem, 
		next, 
		previous,
		goto,
	};
}
