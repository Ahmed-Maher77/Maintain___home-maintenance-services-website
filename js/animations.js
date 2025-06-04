// Scroll Animation Handler
document.addEventListener("DOMContentLoaded", function () {
	// Add scroll-animation class to elements that should animate on scroll
	const elementsToAnimate = document.querySelectorAll(
		".service_section .box, .about_section .detail-box, .about_section .img-box, .contact_section form, .contact_section .map_container"
	);
	elementsToAnimate.forEach((element) => {
		element.classList.add("scroll-animation");
	});

	// Function to check if element is in viewport
	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.bottom >= 0
		);
	}

	// Function to handle scroll animations
	function handleScrollAnimations() {
		const elements = document.querySelectorAll(".scroll-animation");
		elements.forEach((element) => {
			if (isInViewport(element)) {
				element.classList.add("visible");
			}
		});
	}

	// Initial check for elements in viewport
	handleScrollAnimations();

	// Add scroll event listener
	window.addEventListener("scroll", handleScrollAnimations);

	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Add hover effect to service boxes
	const serviceBoxes = document.querySelectorAll(".service_section .box");
	serviceBoxes.forEach((box) => {
		box.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-10px)";
		});
		box.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0)";
		});
	});

	// Add ripple effect to buttons
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.addEventListener("click", function (e) {
			const x = e.clientX - e.target.offsetLeft;
			const y = e.clientY - e.target.offsetTop;

			const ripple = document.createElement("span");
			ripple.style.left = `${x}px`;
			ripple.style.top = `${y}px`;
			ripple.classList.add("ripple");

			this.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	});
});
