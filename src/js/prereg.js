import Axios from "axios";

let prergOverlay = document.getElementById("prereg-msg-overlay"),
	preregMsg = document.getElementById("prereg-msg"),
	preregClg = document.getElementById("prereg-input-college"),
	preregForm = document.getElementById("prereg-form"),
	preregSubmit = document.getElementById("prereg-submit");

const URL = "https://bits-oasis.org/2018/registrations/intro/";
// const URL = "http://172.20.10.5:8000/registrations/intro/";

/* College List */
Axios(
	{
		method: "get",
		url: URL,
	}
)
	.then(
		(response) => {
			if (response.status === 200) {
				let collegeArray = response.data;

				collegeArray.forEach(
					college => {
						let newOption = document.createElement("option");
						newOption.setAttribute("value", college.name);
						newOption.innerHTML = college.name;

						preregClg.appendChild(newOption);
					}
				);
			}
		}
	)
	.catch(
		(error) => {
			console.log(error);
			openPreregDialogMsg("Error ocurred! Please try again later");
		}
	);

// preregClg.addEventListener("change", function () {
//     otherClgControl();
// });

// // display "OTHER COLLEGE" field only when "other" is selected
// function otherClgControl() {
//     if (preregClg.value === "other") {
//         preregClgOther.style.display = "block";
//     }
//     else {
//         preregClgOther.style.display = "none";
//     }
// }

preregForm.onsubmit = function registerForm(f) {

	// disable submit button
	disableSubmitButton();

	let name = document.getElementById("prereg-input-name").value;
	let college = document.getElementById("prereg-input-college").value;
	let email = document.getElementById("prereg-input-email").value;
	let phone = document.getElementById("prereg-input-phone").value;

	let inputArray = [name, college, email, phone];

	if (!areFieldBlank(trimInput(inputArray))) {
		// no field is empty

		if (validateEmail(email)) {
			// correct email format

			if (validatePhoneNumber(phone)) {
				// correct phone number format

				// let collegeName;

				// if (college === "other") {
				//     // "other" option selected for college

				//     if (areFieldBlank(trimInput([otherCollege]))) {
				//         // other college field empty

				//         openPreregDialogMsg("Please enter a college name");
				//     }
				//     else {
				//         // other college field filled

				//         collegeName = otherCollege;
				//     }
				// }
				// else {
				//     // college selected from drop down

				//     collegeName = college;
				// }

				// if (collegeName) {
				// some college name found

				let reCaptacha = checkReCaptacha();

				if (reCaptacha) {
					// recaptcha completed

					submitData(name, college, email, phone, reCaptacha);
				}
				else {
					// recaptcha challenge not completed

					openPreregDialogMsg("Please validate the reCaptacha");

					enableSubmitButton();
				}
				// }
			}
			else {
				// incorrect phone number format

				openPreregDialogMsg("Please enter a correct phone number");

				enableSubmitButton();
			}
		}
		else {
			// incorrect email format

			openPreregDialogMsg("Please enter a correct email address");

			enableSubmitButton();
		}
	}
	else {
		// one or more of the fields is blank

		openPreregDialogMsg("Please fill all the fields");

		enableSubmitButton();
	}

	f.preventDefault();
};

function submitData(name, college, email, phone, reCaptacha) {
	let requestBody = {
		"name": name,
		"college": college,
		"email_id": email,
		"mobile_no": phone,
		"g-recaptcha-response": reCaptacha
	};

	// console.log(reCaptacha);
	// console.log(requestBody);

	Axios(
		{
			method: "post",
			url: URL,
			data: requestBody
		}
	)
		.then(
			(response) => {
				if (response.status === 200) {
					// switch (response.data.x_status) {
					//     case 0: // invalid recaptcha
					//             openPreregDialogMsg(response.data.message);
					//             break;

					//     case 999: // hackerman
					//             openPreregDialogMsg(response.data.message);
					//             break;

					//     case 2: // email already registered
					//             openPreregDialogMsg(response.data.message);
					//             break;

					//     case 3: // incorrect mobile number
					//             openPreregDialogMsg(response.data.message);
					//             break;

					//     case 4: // data is missing
					//             openPreregDialogMsg(response.data.message);
					//             break;

					//     default: // no error
					//             openPreregDialogMsg(response.data.message);
					//             break;
					// }

					openPreregDialogMsg(response.data.message);
				}

				enableSubmitButton();
			}
		)
		.catch(
			(error) => {
				console.log(error.response);
				openPreregDialogMsg("Error ocurred! Please try again later");

				enableSubmitButton();
			}
		);
}

function checkReCaptacha() {
	let reCaptchaVal = preregForm.elements[preregForm.elements.length - 1].value;

	if (reCaptchaVal) {
		return reCaptchaVal;
	}
}

function disableSubmitButton() {
	preregSubmit.disabled = true;
	preregSubmit.classList.add("disabled-button");
}

function enableSubmitButton() {
	preregSubmit.disabled = false;
	preregSubmit.classList.remove("disabled-button");
}

function validatePhoneNumber(num) {
	let phoneNumRegex = /^[0-9]{10}$/;
	let match = phoneNumRegex.test(num);

	return match;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function areFieldBlank(vals) {
	let re = /^(\s)*$/;
	var isAnyFieldBlank = false;
	vals.forEach(field => {
		if (re.test(field)) isAnyFieldBlank = true;
	});
	return isAnyFieldBlank;
}

function trimInput(vals) {
	vals.forEach((field, index) => {
		vals[index] = field.replace(/^\s+|\s+$/gm, "");
	});

	return vals;
}

function openPreregDialogMsg(msg) {
	prergOverlay.style.display = "flex";
	preregMsg.innerHTML = msg;
}

function closePreregDialogMsg() {
	prergOverlay.style.display = "none";
}

document.getElementById("close-prereg-msg").addEventListener("click", closePreregDialogMsg);
