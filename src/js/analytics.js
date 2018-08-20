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
				console.log("clicked");
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
				}).then(response => {
					console.log("here")
					console.log(response)	
				}).catch(err => console.log(err))
			});	
		})
	});
})()
