/* =====================================================
   ARCHIVIO
   SIGNUP PAGE
===================================================== */


/* =====================================================
   IMAGE SLIDER
===================================================== */

const slides =
    document.querySelectorAll(".signup-slide");

const dots =
    document.querySelectorAll(".signup-slider-dot");

let currentSlide = 0;
let slideTimer;


/* =====================================================
   SHOW SLIDE
===================================================== */

function showSlide(index) {

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}


/* =====================================================
   NEXT SLIDE
===================================================== */

function nextSlide() {

    let nextIndex =
        currentSlide + 1;

    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }

    showSlide(nextIndex);
}


/* =====================================================
   START SLIDER
===================================================== */

function startSlider() {

    slideTimer = setInterval(
        nextSlide,
        5000
    );
}


if (slides.length > 0) {

    showSlide(0);
    startSlider();

}


/* =====================================================
   DOT CONTROLS
===================================================== */

dots.forEach(function (dot) {

    dot.addEventListener(
        "click",
        function () {

            const selectedSlide =
                Number(
                    dot.dataset.slide
                );

            showSlide(selectedSlide);

            clearInterval(slideTimer);

            startSlider();

        }
    );

});


/* =====================================================
   PASSWORD EYE
===================================================== */

const passwordInput =
    document.querySelector("#signupPassword");

const passwordToggle =
    document.querySelector("#signupPasswordToggle");


if (passwordToggle) {

    passwordToggle.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type = "text";

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            }

            else {

                passwordInput.type = "password";

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}


/* =====================================================
   CONFIRM PASSWORD EYE
===================================================== */

const confirmPasswordInput =
    document.querySelector("#signupConfirmPassword");

const confirmPasswordToggle =
    document.querySelector("#signupConfirmPasswordToggle");


if (confirmPasswordToggle) {

    confirmPasswordToggle.addEventListener(
        "click",
        function () {

            if (
                confirmPasswordInput.type === "password"
            ) {

                confirmPasswordInput.type = "text";

                confirmPasswordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            }

            else {

                confirmPasswordInput.type = "password";

                confirmPasswordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}


/* =====================================================
   FORM ELEMENTS
===================================================== */

const signupForm =
    document.querySelector("#signupForm");

const firstName =
    document.querySelector("#signupFirstName");

const lastName =
    document.querySelector("#signupLastName");

const email =
    document.querySelector("#signupEmail");

const phone =
    document.querySelector("#signupPhone");

const signupMessage =
    document.querySelector("#signupMessage");

const terms =
    document.querySelector("#signupTerms");


/* =====================================================
   PASSWORD RULE ELEMENTS
===================================================== */

const lengthRule =
    document.querySelector("#lengthRule");

const uppercaseRule =
    document.querySelector("#uppercaseRule");

const lowercaseRule =
    document.querySelector("#lowercaseRule");

const numberRule =
    document.querySelector("#numberRule");

const specialRule =
    document.querySelector("#specialRule");


/* =====================================================
   PASSWORD RULES — LIVE VALIDATION
===================================================== */

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        function () {

            const value =
                passwordInput.value;


            /* 8+ CHARACTERS */

            if (value.length >= 8) {

                lengthRule.classList.add("valid");

            }

            else {

                lengthRule.classList.remove("valid");

            }


            /* UPPERCASE */

            if (/[A-Z]/.test(value)) {

                uppercaseRule.classList.add("valid");

            }

            else {

                uppercaseRule.classList.remove("valid");

            }


            /* LOWERCASE */

            if (/[a-z]/.test(value)) {

                lowercaseRule.classList.add("valid");

            }

            else {

                lowercaseRule.classList.remove("valid");

            }


            /* NUMBER */

            if (/[0-9]/.test(value)) {

                numberRule.classList.add("valid");

            }

            else {

                numberRule.classList.remove("valid");

            }


            /* SPECIAL CHARACTER */

            if (/[^A-Za-z0-9]/.test(value)) {

                specialRule.classList.add("valid");

            }

            else {

                specialRule.classList.remove("valid");

            }

        }
    );

}


/* =====================================================
   CONFIRM PASSWORD — LIVE MATCH CHECK
===================================================== */

if (confirmPasswordInput) {

    confirmPasswordInput.addEventListener(
        "input",
        function () {

            if (
                confirmPasswordInput.value === ""
            ) {

                signupMessage.textContent = "";

                return;

            }


            if (
                passwordInput.value !==
                confirmPasswordInput.value
            ) {

                signupMessage.textContent =
                    "Passwords do not match.";

            }

            else {

                signupMessage.textContent =
                    "✓ Passwords match.";

            }

        }
    );

}


/* =====================================================
   SIGNUP FORM VALIDATION
===================================================== */

signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* =================================================
           FIRST NAME VALIDATION
        ================================================= */

        const namePattern =
            /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;


        if (
            !namePattern.test(
                firstName.value.trim()
            )
        ) {

            signupMessage.textContent =
                "Please enter a valid first name.";

            firstName.focus();

            return;

        }


        /* =================================================
           LAST NAME VALIDATION
        ================================================= */

        if (
            !namePattern.test(
                lastName.value.trim()
            )
        ) {

            signupMessage.textContent =
                "Please enter a valid last name.";

            lastName.focus();

            return;

        }


        /* =================================================
           EMAIL VALIDATION
        ================================================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                email.value.trim()
            )
        ) {

            signupMessage.textContent =
                "Please enter a valid email address.";

            email.focus();

            return;

        }


        /* =================================================
           CHECK EXISTING EMAIL
        ================================================= */

        const existingUsers =
            JSON.parse(localStorage.getItem("archivioUsers")) || [];

        const emailExists = existingUsers.some(function (user) {
            return user.email === email.value.trim().toLowerCase();
        });

        if (emailExists) {

            signupMessage.textContent =
                "An account with this email already exists.";

            return;

        }


        /* =================================================
           PHONE VALIDATION
           OPTIONAL FIELD
        ================================================= */

        if (
            phone.value.trim() !== ""
        ) {

            const phonePattern =
                /^[6-9][0-9]{9}$/;


            if (
                !phonePattern.test(
                    phone.value.trim()
                )
            ) {

                signupMessage.textContent =
                    "Please enter a valid 10-digit phone number.";

                phone.focus();

                return;

            }

        }


        /* =================================================
           PASSWORD VALIDATION
        ================================================= */

        const passwordValue =
            passwordInput.value;


        const hasLength =
            passwordValue.length >= 8;

        const hasUppercase =
            /[A-Z]/.test(passwordValue);

        const hasLowercase =
            /[a-z]/.test(passwordValue);

        const hasNumber =
            /[0-9]/.test(passwordValue);

        const hasSpecial =
            /[^A-Za-z0-9]/.test(passwordValue);


        if (
            !hasLength ||
            !hasUppercase ||
            !hasLowercase ||
            !hasNumber ||
            !hasSpecial
        ) {

            signupMessage.textContent =
                "Please create a stronger password.";

            passwordInput.focus();

            return;

        }


        /* =================================================
           CONFIRM PASSWORD
        ================================================= */

        if (
            passwordValue !==
            confirmPasswordInput.value
        ) {

            signupMessage.textContent =
                "Passwords do not match.";

            confirmPasswordInput.focus();

            return;

        }


        /* =================================================
           TERMS & CONDITIONS
        ================================================= */

        if (!terms.checked) {

            signupMessage.textContent =
                "Please accept the Terms & Conditions.";

            return;

        }


        /* =================================================
           SAVE USER
        ================================================= */

        const existingUsersToSave =
            JSON.parse(localStorage.getItem("archivioUsers")) || [];

        const newUser = {
            id: Date.now(),
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim().toLowerCase(),
            phone: phone.value.trim(),
            password: passwordInput.value
        };

        existingUsersToSave.push(newUser);

        localStorage.setItem(
            "archivioUsers",
            JSON.stringify(existingUsersToSave)
        );


        /* =================================================
           SUCCESS
        ================================================= */

        signupMessage.textContent =
            "Your archive is ready. Welcome to Archivio.";

    }
);