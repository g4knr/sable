const SABLE_SITEWIDE = (() => {
	// call init function when the page is ready
	if (document.readyState !== "loading") {
		init();
	} else {
		document.addEventListener("DOMContentLoaded", init);
	}

	/*
	CODE GROUPS
	1. old nav
	2. nav
	3. scrolling panels
	4. section slider
	5. compressed tables
	6. sticky phones
	*/

	// breakpoints
	let isDesktop = window.matchMedia("(min-width: 992px)").matches,
		isTablet = window.matchMedia("(max-width: 991px) and (min-width: 768px)").matches,
		isLandscape = window.matchMedia("(max-width: 767px) and (min-width: 480px)").matches,
		isMobile = window.matchMedia("(max-width: 479px)").matches;

	// old components
	const OLD_NAV = document.querySelector(".old-nav");

	// nav & light vs dark
	const IS_LIGHT = document.querySelector(".body.is--light") ? true : false;
	const NAV = document.querySelector(".nav-wrapper");
	const NAV_BRAND = NAV.querySelector(".nav-brand");
	const NAV_BUTTON = NAV.querySelector(".button.is--nav");
	const NAV_DROPDOWNS = NAV.querySelectorAll(".nav-dropdown");
	const NAV_TRIGGER = NAV.querySelector(".nav-menu__trigger");

	// scrolling panels
	const SCROLLING_PANELS_SECTION = document.querySelector(".section.is--scrolling-panels");
	const SCROLLING_PANELS = document.querySelectorAll(".scrolling-panels__panel");
	const SCROLLING_MAIN = SCROLLING_PANELS[0];
	const SCROLLING_GRAPHICS = SCROLLING_PANELS[1];
	const SCROLLING_BUTTONS = document.querySelectorAll(".scrolling-panels__arrow");

	// section slider
	const SECTION_SLIDER = document.querySelectorAll(".section-slider");

	// compressed tables
	const COMPRESSED_TABLE = document.querySelector(".compressed-table");
	const COMPRESSED_TITLES = document.querySelectorAll(".table-item.is--scrolling-title");
	const COMPRESSED_ITEMS = document.querySelectorAll(".compressed-table__items .table-item");
	const COMPRESSED_SELECT = document.querySelector(".compressed-table__select");

	// initialize
	function init() {
		console.log("SITEWIDE");

		prep();
		listeners();
	}

	// preparative code
	function prep() {
		// definite prep
		if (IS_LIGHT) {
			NAV_BRAND.classList.toggle("filter-invert");
			NAV_BUTTON.classList.toggle("on-light");
		}

		// breakpoint dependant prep
		compressedTableMobilePrep();
	}

	// reactive code
	function listeners() {
		// definitive listeners
		if (OLD_NAV) {
			const OLD_NAV_BACKGROUND = OLD_NAV.querySelector(".old-nav-background");
			window.addEventListener("scroll", () => {
				setTimeout(() => {
					if (window.scrollY >= 64) {
						OLD_NAV_BACKGROUND.classList.add("is--visible");
					} else {
						OLD_NAV_BACKGROUND.classList.remove("is--visible");
					}
				}, 400);
			});
		}

		if (NAV) {
			window.addEventListener("scroll", () => {
				if (window.scrollY >= NAV.clientHeight && window.scrollY < window.innerHeight) {
					NAV.classList.remove("is--scrolled");
					NAV.classList.add("is--scrolling");
					setTimeout(() => {
						NAV.style.position = "fixed";
					}, 500);
				} else if (window.scrollY >= window.innerHeight) {
					NAV.classList.remove("is--scrolling");
					NAV.classList.add("is--scrolled");
					NAV.style.position = "fixed";
				} else {
					NAV.style.position = "absolute";
					NAV.classList.remove("is--scrolling");
					NAV.classList.remove("is--scrolled");
				}
			});
		}

		if (SECTION_SLIDER.length > 0) {
			SECTION_SLIDER.forEach((item) => {
				let arrows = item.querySelectorAll(".section-slider__arrow");
				let buttons = item.querySelectorAll(".section-slide__arrow");
				buttons.forEach((button, index) => {
					let desiredIndex = index;
					while (desiredIndex > 0) {
						desiredIndex -= 2;
					}
					button.onclick = () => {
						arrows[Math.abs(desiredIndex)].click();
					};
				});
			});
		}

		if (IS_LIGHT) {
			if (isDesktop || isTablet) {
				NAV_DROPDOWNS.forEach((target) => {
					target.addEventListener("mouseenter", () => {
						target.parentElement.classList.add("text-color-white");
						NAV_BRAND.classList.remove("filter-invert");
						NAV_BUTTON.classList.remove("on-light");
					});
					target.addEventListener("mouseleave", () => {
						target.parentElement.classList.remove("text-color-white");
						NAV_BRAND.classList.add("filter-invert");
						NAV_BUTTON.classList.add("on-light");
					});
				});
			}
		} else if (!IS_LIGHT) {
			if (isLandscape || isMobile) {
				NAV_TRIGGER.onclick = () => {
					NAV_BRAND.classList.toggle("filter-invert");
					NAV_TRIGGER.classList.toggle("text-color-black");
				};
			}
		}

		if (SCROLLING_PANELS_SECTION && (isLandscape || isMobile)) {
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

					if (moveTo === 0) {
						SCROLLING_BUTTONS[0].disabled = true;
						SCROLLING_BUTTONS[1].disabled = false;
					} else if (moveTo === numberOfSlides - 1) {
						SCROLLING_BUTTONS[0].disabled = false;
						SCROLLING_BUTTONS[1].disabled = true;
					} else {
						SCROLLING_BUTTONS[0].disabled = false;
						SCROLLING_BUTTONS[1].disabled = false;
					}

					SCROLLING_MAIN.style.transform = `translate(-${moveTo * 100}%, 0px)`;
					SCROLLING_GRAPHICS.style.transform = `translate(-${moveTo * 100}%, 0px)`;

					SCROLLING_PANELS_SECTION.setAttribute("data-current-panel", moveTo);
				});
			});
		}

		if ((isLandscape || isMobile) && navigator.userAgent.indexOf("CriOS") >= 0) {
			let scrollPos = 0;
			const MOBILE_CTA = document.querySelector(".mobile-cta");
			window.addEventListener("scroll", () => {
				let newPos = window.scrollY;
				if (newPos > scrollPos) {
					MOBILE_CTA.style.paddingBottom = "3em";
				} else {
					MOBILE_CTA.style.paddingBottom = "1.5em";
				}
				scrollPos = window.scrollY;
			});
		}

		if (COMPRESSED_TABLE && (isLandscape || isMobile)) {
			// when the select changes
			COMPRESSED_SELECT.onchange = (e) => {
				COMPRESSED_TABLE.classList.add("is--changing");
				COMPRESSED_ITEMS.forEach((item) => {
					let indexOfItem = Array.from(item.parentNode.children).indexOf(item);
					if (indexOfItem === 0) return;
					item.style.display = "none";
					if (indexOfItem !== e.target.selectedIndex + 1) return;
					item.style.display = "flex";
				});
				setTimeout(() => {
					COMPRESSED_TABLE.classList.remove("is--changing");
				}, 250);
			};
		}
	}

	const CREATE_ELEMENT = (type, location, options = {}) => {
		const element = document.createElement(type);

		Object.entries(options).forEach(([key, value]) => {
			if (key === "class") {
				element.classList.add(value);
				return;
			}

			if (key === "dataset") {
				Object.entries(value).forEach(([dataKey, dataValue]) => {
					element.dataset[dataKey] = dataValue;
				});
				return;
			}

			if (key === "text") {
				element.textContent = value;
				return;
			}

			if (key === "callback") {
				element.onload = value;
				return;
			}

			element.setAttribute(key, value);
		});

		location.appendChild(element);
	};

	function compressedTableMobilePrep() {
		if (COMPRESSED_TABLE && (isLandscape || isMobile)) {
			// prep the select
			COMPRESSED_SELECT.remove(0);
			COMPRESSED_TITLES.forEach((title, index) => {
				if (index === 0) return;
				let name = title.textContent;
				let option = document.createElement("option");
				option.text = name;
				option.value = name.toLowerCase().replaceAll(" ", "-");
				COMPRESSED_SELECT.add(option);
			});

			// hide all needed icons
			COMPRESSED_ITEMS.forEach((item) => {
				let indexOfItem = Array.from(item.parentNode.children).indexOf(item);
				if (indexOfItem <= 1) return;
				item.style.display = "none";
			});
		}
	}

	return {
		isDesktop,
		isTablet,
		isLandscape,
		isMobile,
		CREATE_ELEMENT
	};
})();
