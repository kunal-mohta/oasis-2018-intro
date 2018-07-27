let pages = {
	home: {
		name: "home",
		elem: document.getElementById("home"),
		navElem: document.getElementById("home-nav"),
		mobileNavElem: document.getElementById("mobile-home-nav")
	},
	videos: {
		name: "videos",
		elem: document.getElementById("videos"),
		navElem: document.getElementById("videos-nav"),
		mobileNavElem: document.getElementById("mobile-videos-nav")
	},
	about: {
		name: "about",
		elem: document.getElementById("about"),
		navElem: document.getElementById("about-nav"),
		mobileNavElem: document.getElementById("mobile-about-nav")
	},
	sponsors: {
		name: "sponsors",
		elem: document.getElementById("sponsors"),
		navElem: document.getElementById("sponsors-nav"),
		mobileNavElem: document.getElementById("mobile-sponsors-nav")
	},
	prereg: {
		name: "prereg",
		elem: document.getElementById("prereg"),
		navElem: document.getElementById("prereg-nav"),
		mobileNavElem: document.getElementById("mobile-prereg-nav")
	},
	contact: {
		name: "contact",
		elem: document.getElementById("contact"),
		navElem: document.getElementById("contact-nav"),
		mobileNavElem: document.getElementById("mobile-contact-nav")
	}
};

let currentPage = pages.home,
	mobileNavIcon = document.getElementById("ham-icon"),
	mobileCloseIcon = document.getElementById("close-icon"),
	mobileNavPage = document.getElementById("mobile-nav-page"),
	mobileNavPageFilter = document.getElementById("mobile-nav-page-filter"),
	mainBody = document.getElementById("main-body");

//navigation function
function navigateToTab (pageName) {
	currentPage.elem.style.display = "none";
	currentPage.navElem.classList.remove("nav-selected");
	currentPage.navElem.style.borderTop = "solid 5px rgba(0,0,0,0)";

	/* importing themeChange object
	* from themeChange.js
	* to get the current theme color
	*/
	let theme = require("./themeChange");

	currentPage = pages[pageName];
	currentPage.elem.style.display = "block";
	currentPage.navElem.classList.add("nav-selected");
	currentPage.navElem.style.borderTop = "solid 5px " + theme.changes[0].colors[theme.currentThemeCounter];
}

// navigation function for mobile
function mobileNavigateToTab (pageName) {
	closeMobileNav();
	currentPage.elem.style.display = "none";

	currentPage = pages[pageName];
	currentPage.elem.style.display = "block";
}

//binding onclick events
for (const page in pages) {
	//creating a closure
	(function () {
		let pageName = pages[page].name;
		pages[page].navElem.addEventListener("click", function () {
			navigateToTab(pageName);
		});
		pages[page].mobileNavElem.addEventListener("click", function () {
			mobileNavigateToTab(pageName);
		});
	})();
}

// open mobile navigation
function openMobileNav () {
	// making things disappear
	mainBody.style.opacity = "0";
	mobileNavIcon.style.opacity = "0";

	// adding transition to the appearance of nav list
	let transitionDelay = 0.05,
		transitionDuration = 0.05;
	document.querySelectorAll("#mobile-nav-list li").forEach(
		(navItem) => {
			navItem.style.transition = `opacity ${transitionDuration}s ${transitionDelay}s linear`;

			transitionDelay += 0.05;
		}
	);

	// making things appear
	mobileNavPage.style.display = "flex";
	mobileNavPageFilter.style.transform = "scale(300)";

	setTimeout(
		() => {
			document.querySelectorAll("#mobile-nav-list li").forEach(
				(navItem) => {
					navItem.style.opacity = "1";
				}
			);
		},
		200
	);
}

// close mobile navigation
function closeMobileNav () {
	// making things disappear
	mobileNavPage.style.display = "none";
	mobileNavPageFilter.style.transform = "scale(1)";

	document.querySelectorAll("#mobile-nav-list li").forEach(
		(navItem) => {
			navItem.style.opacity = "0";
		}
	);

	// making things appear
	mainBody.style.opacity = "1";
	mobileNavIcon.style.opacity = "1";
}

mobileNavIcon.addEventListener("click", openMobileNav);
mobileCloseIcon.addEventListener("click", closeMobileNav);
