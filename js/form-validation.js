// Form validation schema
const validationSchema = {
	name: {
		required: true,
		minLength: 2,
		maxLength: 50,
		pattern: /^[a-zA-Z\s]*$/,
	},
	phone: {
		required: true,
		pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
	},
	email: {
		required: true,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	message: {
		required: true,
		minLength: 10,
		maxLength: 500,
	},
};

// Error messages
const errorMessages = {
	name: {
		required: "Name is required",
		minLength: "Name must be at least 2 characters",
		maxLength: "Name must be less than 50 characters",
		pattern: "Name can only contain letters and spaces",
	},
	phone: {
		required: "Phone number is required",
		pattern: "Please enter a valid phone number",
	},
	email: {
		required: "Email is required",
		pattern: "Please enter a valid email address",
	},
	message: {
		required: "Message is required",
		minLength: "Message must be at least 10 characters",
		maxLength: "Message must be less than 500 characters",
	},
};

// Create error message element
function createErrorMessage(message) {
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message";
	errorDiv.style.color = "red";
	errorDiv.style.fontSize = "12px";
	errorDiv.style.marginTop = "5px";
	errorDiv.textContent = message;
	return errorDiv;
}

// Validate field
function validateField(field, value) {
	const rules = validationSchema[field];
	const errors = [];

	if (rules.required && !value) {
		errors.push(errorMessages[field].required);
	}

	if (value) {
		if (rules.minLength && value.length < rules.minLength) {
			errors.push(errorMessages[field].minLength);
		}
		if (rules.maxLength && value.length > rules.maxLength) {
			errors.push(errorMessages[field].maxLength);
		}
		if (rules.pattern && !rules.pattern.test(value)) {
			errors.push(errorMessages[field].pattern);
		}
	}

	return errors;
}

// Show success popup
function showSuccessPopup() {
	const popup = document.createElement("div");
	popup.className = "success-popup";
	popup.style.position = "fixed";
	popup.style.top = "20px";
	popup.style.right = "20px";
	popup.style.backgroundColor = "#4CAF50";
	popup.style.color = "white";
	popup.style.padding = "15px 25px";
	popup.style.borderRadius = "5px";
	popup.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
	popup.style.zIndex = "1000";
	popup.style.animation = "slideIn 0.5s ease-out";
	popup.textContent = "Message sent successfully!";

	document.body.appendChild(popup);

	// Add animation keyframes
	const style = document.createElement("style");
	style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
	document.head.appendChild(style);

	// Remove popup after 3 seconds
	setTimeout(() => {
		popup.style.animation = "fadeOut 0.5s ease-out";
		setTimeout(() => {
			document.body.removeChild(popup);
		}, 500);
	}, 3000);
}

// Handle form submission
function handleFormSubmit(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	let isValid = true;

	// Clear previous error messages
	form.querySelectorAll(".error-message").forEach((el) => el.remove());

	// Validate each field
	for (let [field, value] of formData.entries()) {
		const errors = validateField(field, value);
		const input = form.querySelector(`[name="${field}"]`);

		if (errors.length > 0) {
			isValid = false;
			const errorDiv = createErrorMessage(errors[0]);
			input.parentNode.appendChild(errorDiv);
			input.style.borderColor = "red";
		} else {
			input.style.borderColor = "";
		}
	}

	if (isValid) {
		// Here you would typically send the form data to your server
		// For now, we'll just show the success popup
		showSuccessPopup();
		form.reset();
	}
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll("form");
	forms.forEach((form) => {
		form.addEventListener("submit", handleFormSubmit);

		// Add input event listeners for real-time validation
		form.querySelectorAll("input, textarea").forEach((input) => {
			input.addEventListener("input", function () {
				const errors = validateField(this.name, this.value);
				const existingError = this.parentNode.querySelector(".error-message");

				if (existingError) {
					existingError.remove();
				}

				if (errors.length > 0) {
					const errorDiv = createErrorMessage(errors[0]);
					this.parentNode.appendChild(errorDiv);
					this.style.borderColor = "red";
				} else {
					this.style.borderColor = "";
				}
			});
		});
	});
});
