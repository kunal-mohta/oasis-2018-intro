function init() {
	const STUCCA = [
		{
			name: "Aditi Pandey",
			email: "pcr@bits-oasis.org",
			dept: "Registration & Other Enquiries",
			phone: "+91 80033 05723",
			image: () => require("../assets/imgs/stucca/aditipandey.png")
		},
		{
			name: "Yash Devnani",
			email: "controls@bits-oasis.org",
			dept: "Events, Competitions and Operations",
			phone: "+91 75979 61803",
			image: () => require("../assets/imgs/stucca/yashdevnani.png")
		},
		{
			name: "Punit Batra",
			email: "sponsorship@bits-oasis.org",
			dept: "Sponsorship and Marketing",
			phone: "+91 80033 35712",
			image: () => require("../assets/imgs/stucca/punitbatra.png")
		},
		{
			name: "Amritanshu Jain",
			email: "webmaster@bits-oasis.org",
			dept: "Website, App & Online Payments",
			phone: "+91 99531 08361",
			image: () => require("../assets/imgs/stucca/amritanshujain.png")
		},
		{
			name: "Chirag Parikh",
			email: "adp@bits-oasis.org",
			dept: "Art, Design & Publicity",
			phone: "+91 80031 70752",
			image: () => require("../assets/imgs/stucca/chiragparikh.png")
		},
		{
			name: "Rahul Unnithan",
			email: "recnacc@bits-oasis.org",
			dept: "Reception and Accomodation",
			phone: "+91 77372 62761",
			image: () => require("../assets/imgs/stucca/rahulunnithan.png")
		},
		{
			name: "Satyansh Rai",
			email: "president@pilani.bits-pilani.ac.in",
			dept: "Student Union President",
			phone: "+91 91511 78228",
			image: () => require("../assets/imgs/stucca/satyanshrai.png")
		}
	];

	let stuccaDiv = document.getElementById("stucca-body");
	STUCCA.map(stuccan => {
		stuccaDiv.innerHTML += `
			<div class="stuccan">
				<img src="${stuccan.image()}" class="stuccanImg"></span>
				<div class="stuccanName stuccanText">${stuccan.name}</div>
				<div class="stuccanDept stuccanText"><i>${stuccan.dept}</i></div>
				<div class="stuccanEmail stuccanText">${stuccan.email}</div>
				<div class="stuccanPhone stuccanText">${stuccan.phone}</div>
			</div>
		`;
	})
}
init();