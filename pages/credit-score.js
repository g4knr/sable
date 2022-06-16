const CREDIT_SCORE = (() => {
	// nav
	const NAV_WRAP = document.querySelector(".page-wrapper .body.is--light");

	// range slider
	const RANGE_SLIDER = document.querySelector("#explore-score__range");
	const EXPLORE_SCORE = document.querySelector(".explore-score__score");
	const EXPLORE_PROMPT = document.querySelector(".explore-score__try");
	let rangeValue = Number(EXPLORE_SCORE.textContent);
	const RANGE_BRACKET_TEXT = document.querySelector("#explore-bracket");
	let rangeBracket = RANGE_BRACKET_TEXT.textContent;

	// call init function when the page is ready
	if (document.readyState !== "loading") {
		init();
	} else {
		document.addEventListener("DOMContentLoaded", init);
	}

	// initial function
	function init() {
		console.log("CREDIT_SCORE");

		prep();
		listeners();
	}

	function prep() {}

	function listeners() {
		// nav
		window.addEventListener("scroll", () => {
			if (window.scrollY >= window.innerHeight) {
				NAV_WRAP.classList.remove("is--light");
				SABLE_SITEWIDE.NAV_BRAND.classList.remove("filter-invert");
				SABLE_SITEWIDE.NAV_BUTTON.classList.remove("on-light");
			} else {
				NAV_WRAP.classList.add("is--light");
				SABLE_SITEWIDE.NAV_BRAND.classList.add("filter-invert");
				SABLE_SITEWIDE.NAV_BUTTON.classList.add("on-light");
			}
		});

		// range slider
		RANGE_SLIDER.addEventListener("change", rangeSlider);
		RANGE_SLIDER.addEventListener("input", rangeSlider);

		function rangeSlider() {
			EXPLORE_PROMPT.style.opacity = "0%";
			rangeValue = Number(RANGE_SLIDER.value);
			EXPLORE_SCORE.textContent = rangeValue;

			console.log(rangeValue);

			if (rangeValue >= 800) rangeBracket = "Exceptional";
			if (rangeValue <= 799) rangeBracket = "Very good";
			if (rangeValue <= 739) rangeBracket = "Good";
			if (rangeValue <= 669) rangeBracket = "Poor";
			if (rangeValue <= 579) rangeBracket = "Very Poor";

			RANGE_BRACKET_TEXT.textContent = rangeBracket;
		}
	}
	return {};
})();
