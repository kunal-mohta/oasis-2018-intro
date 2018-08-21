import axios from "axios";

(function videoLog(){
	const apiRoot = "https://bits-oasis.org/2018/analytics/views/";
	const vids = 
		[
			{
				className: "analytics-teaser18", 
				videoName: "teaser18",
				watched: false
			},
			{
				className: "analytics-aftermovie17", 
				videoName: "aftermovie17",
				watched: false
			},
			{
				className: "analytics-teaser17", 
				videoName: "teaser17",
				watched: false
			},
			{
				className: "analytics-aftermovie16", 
				videoName: "aftermovie16",
				watched: false
			}
		];
	vids.forEach(vidObj => {
		const {className, videoName} = vidObj;
		const classEl = document.getElementsByClassName(className);
		Array.from(classEl).forEach(el => {
			el.addEventListener('click', () => {
				if(vidObj.watched) return;
				vidObj.watched = true;
				axios({
					method: "post",
					url: apiRoot,
					data: JSON.stringify({
						name: videoName	
					}),
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					}
				}).then(()=> {})
					.catch(() => {})
			});	
		})
	});
})();


(function homeScreenLog(){

	const apiRoot = "https://bits-oasis.org/2018/analytics/viewtimer/";
	
	let secondsUntilNavigate = -3.5;
	window.addEventListener('load', () => setInterval(
		() => {++secondsUntilNavigate},
		1000
	))
	
	const searchTabs = [
		...Array.from(document.querySelectorAll('#nav-list li')),
		...Array.from(document.querySelectorAll('#mobile-nav-list li')),
	]; 

	const excludeIds = [
		'home-nav', 'mobile-home-nav'
	];

	let changed = false;

	searchTabs
		.filter(tab => !excludeIds.some(excludeId => tab.id === excludeId))
		.forEach(tab => tab.addEventListener('click',
		() => {
			//If already navigated away
			if(changed) return;

			changed = true;

			console.log(changed);

			axios({
					method: "post",
					url: apiRoot,
					data: JSON.stringify({
						seconds_viewed: secondsUntilNavigate
					}),
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					}
				}).then(()=> {console.log(secondsUntilNavigate)})
					.catch((err) => {console.log(err)})
			
		}));

})();
