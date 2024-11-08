const usernameInput = document.getElementById("username");
const submitBtn = document.getElementById("submitBtn");

const lowercaseRequirement = document.getElementById("lowercase");
const uppercaseRequirement = document.getElementById("uppercase");
const lengthRequirement = document.getElementById("length");

usernameInput.addEventListener("input", () => {
const username = usernameInput.value;

const hasLowercase = /[a-z]/.test(username);
const hasUppercase = /[A-Z]/.test(username);
const isLongEnough = username.length >= 6;

    if (hasLowercase) {
        lowercaseRequirement.classList.add("valid");
    } else {
        lowercaseRequirement.classList.remove("valid");
    }

    if (hasUppercase) {
        uppercaseRequirement.classList.add("valid");
    } else {
        uppercaseRequirement.classList.remove("valid");
    }

    if (isLongEnough) {
        lengthRequirement.classList.add("valid");
    } else {
        lengthRequirement.classList.remove("valid");
    }

    submitBtn.disabled = !(hasLowercase && hasUppercase && isLongEnough);
});
