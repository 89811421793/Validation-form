function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const email = document.getElementById("email");
const password = document.getElementById("password");
const subm = document.getElementById("submit");
const checker = document.getElementById("check");
const mailtitle = document.querySelector("#spanmail");
const passtitle = document.querySelector("#spanpass");
const cust = document.querySelector("#custcheck");

const errorNoEmail = document.querySelector("#noEmailError");
const errorNoPass = document.querySelector("#noPasswordError");
const errorInvalidEmail = document.querySelector("#invalidEmailError");
const errorShortPass = document.querySelector("#shortPasswordError");
const errorChecker = document.querySelector("#checkboxError");

function toggleError(isInvalid, errorElement, titleElement = null, inputElement = null) {
    errorElement.style.display = isInvalid ? "block" : "none";
    
    if (titleElement) {
        titleElement.classList.toggle("showError", isInvalid);
    }
    if (inputElement) {
        inputElement.classList.toggle("redInputError", isInvalid);
    }
}

subm.addEventListener("click", (e) => {
    e.preventDefault();

    const emailData = email.value;
    const passwordData = password.value;

    toggleError(!checker.checked, errorChecker, null, cust);

    if (!emailData) {
        toggleError(true, errorNoEmail, mailtitle, email);
        toggleError(false, errorInvalidEmail);
    } else {
        toggleError(false, errorNoEmail);
        
        const isEmailValid = validateEmail(emailData);
        toggleError(!isEmailValid, errorInvalidEmail, mailtitle, email);
        
        if (isEmailValid) {
            console.log("email:" + emailData);
        }
    }

    if (!passwordData) {
        toggleError(true, errorNoPass, passtitle, password);
        toggleError(false, errorShortPass);
    } else {
        toggleError(false, errorNoPass);
        
        const isPassShort = passwordData.length < 8;
        toggleError(isPassShort, errorShortPass, passtitle, password);
        
        if (!isPassShort) {
            console.log("password:" + passwordData);
        }
    }
});