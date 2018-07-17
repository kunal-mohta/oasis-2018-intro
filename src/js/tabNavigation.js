var pages = {
    home: {
        name: "home",
        elem: document.getElementById("home"),
        navElem: document.getElementById("home-nav")
    },
    videos: {
        name: "videos",
        elem: document.getElementById("videos"),
        navElem: document.getElementById("videos-nav")
    },
    about: {
        name: "about",
        elem: document.getElementById("about"),
        navElem: document.getElementById("about-nav")
    },
    sponsors: {
        name: "sponsors",
        elem: document.getElementById("sponsors"),
        navElem: document.getElementById("sponsors-nav")
    },
    prereg: {
        name: "prereg",
        elem: document.getElementById("prereg"),
        navElem: document.getElementById("prereg-nav")
    },
    contact: {
        name: "contact",
        elem: document.getElementById("contact"),
        navElem: document.getElementById("contact-nav")
    }
};

var currentPage = pages.home;

//navigation function
function navigateToTab (pageName) {
    currentPage.elem.style.display = "none";

    pages[pageName].elem.style.display = "block";
    currentPage = pages[pageName];
}

//binding onclick events
for (const page in pages) {
    //creating a closure
    (function () {
        var pageName = pages[page].name;
        pages[page].navElem.addEventListener("click", function () {
            navigateToTab(pageName);
        });
    })();
}
