const SABLE_HOME = (() => {
	// call init function when the page is ready
	if (document.readyState !== "loading") {
		init();
	} else {
		document.addEventListener("DOMContentLoaded", init);
	}

	// declare global variables
	// sticky phones
	const STICKY_PHONES_SECTION = document.querySelector(".section.is--3sticky");
	const STICKY_PHONES_ROW = STICKY_PHONES_SECTION.querySelector(".sticky-row");
	// scrolling panels
	const SCROLLING_PANELS_SECTION = document.querySelector(".section.is--scrolling-panels");
	const SCROLLING_PANELS = SCROLLING_PANELS_SECTION.querySelectorAll(".scrolling-panels__panel");
	const SCROLLING_MAIN = SCROLLING_PANELS[0];
	const SCROLLING_GRAPHICS = SCROLLING_PANELS[1];
	const SCROLLING_BUTTONS = SCROLLING_PANELS_SECTION.querySelectorAll(".scrolling-panels__button");

	// initial function
	function init() {
		console.log("HOME");

		prep();
		listeners();
	}

	function prep() {
		if (SABLE_SITEWIDE.isDesktop || SABLE_SITEWIDE.isTablet) {
			// set count for loading scripts
			let count = 0;

			// load gsap
			SABLE_LOADER.newElement("script", document.body, {
				src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js",
				callback: triggerSticky,
				async: true
			});

			// load scrollTrigger
			SABLE_LOADER.newElement("script", document.body, {
				src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js",
				callback: triggerSticky,
				async: true
			});

			// logic to trigger sticky function
			function triggerSticky() {
				count += 1;
				if (count === 2) stickyScroll();
			}

			// sticky function
			function stickyScroll() {
				// register gsap and scrollTrigger
				gsap.registerPlugin(ScrollTrigger);
				ScrollTrigger.defaults({
					markers: false
				});

				// add gsap options
				let stickyRow = gsap.timeline({
					scrollTrigger: {
						trigger: STICKY_PHONES_SECTION,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.5
					}
				});

				// determine gsap logic
				stickyRow.from(STICKY_PHONES_ROW, {
					left: 0,
					right: "auto",
					duration: 1
				});
			}
		}
	}

	function listeners() {
		if (SABLE_SITEWIDE.isLandscape || SABLE_SITEWIDE.isMobile) {
			let numberOfSlides = SCROLLING_MAIN.children.length;
			SCROLLING_BUTTONS.forEach((scrollingButton, index) => {
				scrollingButton.addEventListener("click", () => {
					let currentPanel = Number(SCROLLING_PANELS_SECTION.getAttribute("data-current-panel"));

					let moveTo = 0;
					if (index === 1) {
						if (currentPanel < numberOfSlides - 1) {
							moveTo = currentPanel + index;
						} else {
							moveTo = 0;
						}
					} else if (index === 0) {
						if (currentPanel > 0) {
							moveTo = currentPanel - 1;
						} else {
							moveTo = numberOfSlides - 1;
						}
					}

					SCROLLING_MAIN.style.transform = `translate(-${moveTo * 100}%, 0px)`;
					SCROLLING_GRAPHICS.style.transform = `translate(-${moveTo * 100}%, 0px)`;

					SCROLLING_PANELS_SECTION.setAttribute("data-current-panel", moveTo);
				});
			});
		}
	}
	return {};
})();
