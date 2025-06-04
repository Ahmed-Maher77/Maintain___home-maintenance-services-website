// Get Current Year
function getCurrentYear() {
	var d = new Date();
	var year = d.getFullYear();
	document.querySelector("#displayDateYear").innerText = year;
}
getCurrentYear();

//client section owl carousel
$(".owl-carousel").owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	dots: false,
	navText: [
		'<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
		'<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
	],
	autoplay: true,
	autoplayHoverPause: true,
	responsive: {
		0: {
			items: 1,
		},
		768: {
			items: 2,
		},
		1000: {
			items: 2,
		},
	},
});

/** google_map js **/

function myMap() {
	var mapProp = {
		center: new google.maps.LatLng(40.712775, -74.005973),
		zoom: 18,
	};
	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// Initial Loader:
const initialLoader = document.createElement("section");
initialLoader.classList.add("initial-loader");
initialLoader.innerHTML = `
    <div class="loading">
        <svg width="64px" height="48px">
            <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
            <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
        </svg>
    </div>
`;
document.body.appendChild(initialLoader);

setTimeout(() => {
	const initialLoader = document.querySelector(".initial-loader");
	if (initialLoader) {
		initialLoader.style.display = "none";
	}
}, 1500);
