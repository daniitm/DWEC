function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    let isValid = true;

    // Validaciones
    if (!firstName.value) firstName.classList.add('invalid');
    else firstName.classList.remove('invalid');

    if (!lastName.value) lastName.classList.add('invalid');
    else lastName.classList.remove('invalid');

    if (!phonePattern.test(phone.value)) phone.classList.add('invalid');
    else phone.classList.remove('invalid');

    if (!emailPattern.test(email.value)) email.classList.add('invalid');
    else email.classList.remove('invalid');

    if (password.value.length < 8 || password.value !== confirmPassword.value) {
        confirmPassword.classList.add('invalid');
    } else {
        confirmPassword.classList.remove('invalid');
    }

    return isValid;
}