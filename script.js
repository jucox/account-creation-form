const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordConfirmation = document.getElementById('password-confirmation')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue === "") {
        setErrorFor(username, "The username is mandatory.");
    } else {
        setSuccessFor(username);
    }

    if (emailValue === "") {
        setErrorFor(email, "The email is mandatory.");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Please enter a valid email.");
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === "") {
        setErrorFor(password, "The password is mandatory.");
    } else if (passwordValue.length < 8) {
        setErrorFor(password, "The password needs at least 8 characters.")
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmationValue === "") {
        setErrorFor(passwordConfirmation, "The password confirmation is mandatory.");
    } else if (passwordConfirmationValue != passwordValue) {
        setErrorFor(passwordConfirmation, "The passwords are not the same.");
    } else {
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll('.form-control');

    const formIsValid = [ ... formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
        allRight();
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    
    formControl.className = 'form-control success';
}

function allRight () {
    const button = document.querySelector('.button')
    button.style.backgroundColor = '#2ECC71';
    button.innerText = "Your account has been created successfully!";
}

// Email Validation Function

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}