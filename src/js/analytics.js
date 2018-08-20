(function videoLog(){
	//const apiRoot = "https://bits-oasis.org/2018/analytics/views/";
	const vids = 
		[
			{
				className: "analytics-teaser18", 
				videoName: "teaser18",
			},
			{
				className: "analytics-aftermovie17", 
				videoName: "aftermovie17",
			},
			{
				className: "analytics-teaser17", 
				videoName: "teaser17",
			},
			{
				className: "analytics-aftermovie16", 
				videoName: "aftermovie16",
			}
		];
	vids.forEach(vidObj => {
		const {className, videoName} = vidObj;
		const classEl = document.getElementsByClassName(className);
		Array.from(classEl).forEach(el => {
			el.addEventListener('click', () => {
				console.log(videoName);
			});	
		})
	});
})()
