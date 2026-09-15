/* ===================================================== 
   ARCHIVIO 
   LOGIN PAGE 
===================================================== */ 


/* ===================================================== 
   IMAGE SLIDER 
===================================================== */ 

const slides = 
    document.querySelectorAll(".login-slide"); 

const dots = 
    document.querySelectorAll(".slider-dot"); 


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
   START AUTOMATIC SLIDER 
===================================================== */ 

function startSlider() { 

    slideTimer = setInterval( 

        nextSlide, 

        5000 

    ); 

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


            /* 
               Restart the timer so clicking a dot 
               doesn't cause an immediate second change. 
            */ 

            clearInterval(slideTimer); 

            startSlider(); 

        } 
    ); 

}); 


/* ===================================================== 
   START SLIDER 
===================================================== */ 

if (slides.length > 0) { 

    showSlide(0); 

    startSlider(); 

} 


/* ===================================================== 
   PASSWORD EYE 
===================================================== */ 

const passwordInput = 
    document.querySelector("#password"); 

const passwordToggle = 
    document.querySelector("#passwordToggle"); 


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


/* ===================================================== 
   FORGOT PASSWORD MODAL 
===================================================== */ 

const forgotPassword = 
    document.querySelector("#forgotPassword"); 

const resetModal = 
    document.querySelector("#resetModal"); 

const resetClose = 
    document.querySelector("#resetClose"); 


/* Open modal */ 

forgotPassword.addEventListener( 
    "click", 
    function (event) { 

        event.preventDefault(); 

        resetModal.classList.add("active"); 

        resetModal.setAttribute( 
            "aria-hidden", 
            "false" 
        ); 

    } 
); 


/* Close modal */ 

resetClose.addEventListener( 
    "click", 
    function () { 

        closeResetModal(); 

    } 
); 


/* Close when clicking outside box */ 

resetModal.addEventListener( 
    "click", 
    function (event) { 

        if ( 
            event.target === resetModal 
        ) { 

            closeResetModal(); 

        } 

    } 
); 


/* Close function */ 

function closeResetModal() { 

    resetModal.classList.remove("active"); 

    resetModal.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 

} 


/* ===================================================== 
   RESET PASSWORD 
===================================================== */ 

const resetForm = 
    document.querySelector("#resetForm"); 

const resetPassword = 
    document.querySelector("#resetPassword"); 

const confirmPassword = 
    document.querySelector("#confirmPassword"); 

const resetMessage = 
    document.querySelector("#resetMessage"); 


resetForm.addEventListener( 
    "submit", 
    function (event) { 

        event.preventDefault(); 


        const password = 
            resetPassword.value; 

        const confirmation = 
            confirmPassword.value; 


        /* Check password length */ 

        if (password.length < 6) { 

            resetMessage.textContent = 
                "Password must contain at least 6 characters."; 

            return; 

        } 


        /* Check matching passwords */ 

        if (password !== confirmation) { 

            resetMessage.textContent = 
                "Passwords do not match."; 

            return; 

        } 


        /* Successful reset */ 

        resetMessage.textContent = 
            "Password reset successfully."; 


        resetMessage.style.color = 
            "#6E2636"; 


        resetForm.reset(); 


        /* 
           Close the modal after a short delay. 
        */ 

        setTimeout( 
            function () { 

                closeResetModal(); 

                resetMessage.textContent = ""; 

            }, 
            1500 
        ); 

    } 
); 


/* ===================================================== 
   LOGIN FORM 
===================================================== */ 

const loginForm = 
    document.querySelector("#loginForm"); 


loginForm.addEventListener( 
    "submit", 
    function (event) { 

        event.preventDefault(); 


        const email = 
            document.querySelector("#email").value.trim().toLowerCase(); 

        const password = 
            document.querySelector("#password").value; 


        if ( 
            email === "" || 
            password.trim() === "" 
        ) { 

            return; 

        } 


        /* =================================================
           GET ALL REGISTERED USERS
        ================================================= */

        const users =
            JSON.parse(
                localStorage.getItem("archivioUsers")
            ) || [];


        /* =================================================
           FIND USER BY EMAIL
        ================================================= */

        const user =
            users.find(function (user) {

                return user.email === email;

            });


        /* =================================================
           CHECK IF ACCOUNT EXISTS
        ================================================= */

        if (!user) {

            alert(
                "No Archivio account was found with this email."
            );

            return;

        }


        /* =================================================
           CHECK PASSWORD
        ================================================= */

        if (user.password !== password) {

            alert(
                "Incorrect password. Please try again."
            );

            return;

        }


        /* =================================================
           SAVE CURRENT USER
        ================================================= */

        const currentUser = {

            id: user.id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            phone: user.phone

        };


        localStorage.setItem(
            "archivioCurrentUser",
            JSON.stringify(currentUser)
        );


        /* =================================================
           SET LOGIN STATUS
        ================================================= */

        localStorage.setItem(
            "archivioLoggedIn",
            "true"
        );


        /* =================================================
           LOGIN SUCCESS
        ================================================= */

        alert(
            "Welcome back to Archivio, " +
            user.firstName + "."
        );


        window.location.href =
            "discover.html";

    }
);