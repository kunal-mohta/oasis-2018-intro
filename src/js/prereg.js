import Axios from "axios";

let prergOverlay = document.getElementById("prereg-msg-overlay"),
    preregMsg = document.getElementById("prereg-msg"),
    preregClg = document.getElementById("prereg-input-college"),
    preregClgOther = document.getElementById("prereg-input-college-other"),
    preregForm = document.getElementById("prereg-form");

const URL = "https://bits-oasis.org/2018/registrations/intro/";

Axios(
    {
        method:'get',
        url: URL,
    }
)
.then(
    (response) => {
        console.log(response);
        // let i=0;
        // while(response.data){
        //     let newOption = document.createElement("option");
        //     newOption.setAttribute("value", i)
        //     newOption.inn
        //     document.getElementById('prereg-input-college').appendChild(newOption);
        //     i++;
        // }
    }
)
.catch(
    (error) => {
        console.log(error);
    }
);

preregClg.addEventListener("change", function () {
    otherClgControl();
});

// display "OTHER COLLEGE" field only when "other" is selected
function otherClgControl() {
    if (preregClg.value === "other") {
        preregClgOther.style.display = "block";
    }
    else {
        preregClgOther.style.display = "none";
    }
}

preregForm.onsubmit = function registerForm(f)
{
    let name = document.getElementById("prereg-input-name").value;
    let college = document.getElementById("prereg-input-college").value;    
    let email = document.getElementById("prereg-input-email").value;
    let phone = document.getElementById("prereg-input-phone").value;
    let otherCollege = document.getElementById("prereg-input-college-other").value;

    let inputArray = [name, college, email, phone];

    if ( !areFieldBlank(trimInput(inputArray)) ) {
        // no field is empty

        if ( validateEmail(email) ) {
            // correct email format

            if ( validatePhoneNumber(phone) ) {
                // correct phone number format

                let collegeName;

                if (college === "other") {
                    // "other" option selected for college

                    if (areFieldBlank(trimInput([otherCollege]))) {
                        // other college field empty

                        openPreregDialogMsg("Please enter a college name");
                    }
                    else {
                        // other college field filled

                        collegeName = otherCollege;
                    }
                }
                else {
                    // college selected from drop down

                    collegeName = college;
                }

                if (collegeName) {
                    // some college name found

                    let reCaptacha = checkReCaptacha();

                    if (reCaptacha) {
                        // recaptcha completed

                        submitData(name, collegeName, email, phone, reCaptacha);
                    }
                    else {
                        // recaptcha challenge not completed

                        openPreregDialogMsg("Please validate the reCaptacha");
                    }
                }
            }
            else {
                // incorrect phone number format

                openPreregDialogMsg("Please enter a correct phone number");
            }
        }
        else {
            // incorrect email format

            openPreregDialogMsg("Please enter a correct email address");
        }
    }
    else {
        // one or more of the fields is blank

        openPreregDialogMsg("Please fill all the fields");
    }

    f.preventDefault();
};

function submitData (name, college, email, phone, reCaptacha) {
    let requestBody = {
        "name": name,
        "college": college,
        "email": email,
        "phone": phone,
        "g-recaptcha-response": reCaptacha
    };

    console.log(reCaptacha);

    Axios(
        {
            method: "post",
            url: URL,
            data: requestBody
        }
    )
    .then(
        (response) => {
            console.log(response);
        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

function checkReCaptacha () {
    let reCaptchaVal = preregForm.elements[preregForm.elements.length - 1].value;

    if (reCaptchaVal) {
        return reCaptchaVal;
    }
}

function validatePhoneNumber (num) {
    let phoneNumRegex = /^[0-9]{10}$/;
    let match = phoneNumRegex.test(num);

    return match;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function areFieldBlank (vals) {
    let re = /^(\s)*$/;
    var isAnyFieldBlank = false;
    vals.forEach(field => {
        if (re.test(field)) isAnyFieldBlank = true;
    });
    return isAnyFieldBlank;
}

function trimInput (vals) {
    vals.forEach((field, index) => {
        vals[index] = field.replace(/^\s+|\s+$/gm, "");
    })

    return vals;
}

function openPreregDialogMsg (msg) {
    prergOverlay.style.display = "flex";
    preregMsg.innerHTML = msg;
}

function closePreregDialogMsg () {
    prergOverlay.style.display = "none";
}

document.getElementById("close-prereg-msg").addEventListener("click", closePreregDialogMsg);
