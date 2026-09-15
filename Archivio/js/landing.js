/* =====================================================
   ARCHIVIO
   Interactive Experience
===================================================== */


/* ================= CUSTOM CURSOR ================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

});


/* Show cursor when hovering interactive objects */

const interactiveObjects = document.querySelectorAll(
    ".floating-object, .archive-card, .memory-card, .recommendation-image"
);

interactiveObjects.forEach(function (object) {

    object.addEventListener("mouseenter", function () {

        cursor.classList.add("active");

    });

    object.addEventListener("mouseleave", function () {

        cursor.classList.remove("active");

    });

});


/* ================= PARALLAX HERO ================= */

const objects = document.querySelectorAll(
    ".floating-object:not(.no-parallax)"
);

hero.addEventListener("mousemove", function (event) {

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);


    objects.forEach(function (object, index) {

        const strength = (index + 1) * 8;

        object.style.marginLeft =
            `${x * strength}px`;

        object.style.marginTop =
            `${y * strength}px`;

    });

});


/* ================= MAGNETIC BUTTONS ================= */

const magneticButtons =
    document.querySelectorAll(".magnetic-button");


magneticButtons.forEach(function (button) {

    button.addEventListener("mousemove", function (event) {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;


        button.style.transform =
            `translate(${x * 0.25}px, ${y * 0.25}px)`;

    });


    button.addEventListener("mouseleave", function () {

        button.style.transform = "translate(0, 0)";

    });

});


/* ================= SCROLL MOTION ================= */

const heroWords =
    document.querySelectorAll(".hero-word");


window.addEventListener("scroll", function () {

    const scroll = window.scrollY;


    heroWords.forEach(function (word, index) {

        const speed =
            index === 0 ? 0.15 : -0.1;

        word.style.transform =
            `translateX(${scroll * speed}px)
             rotate(${index === 0 ? -8 : 5}deg)`;

    });

});


/* ================= ARCHIVE CARD TILT ================= */

const archiveCards =
    document.querySelectorAll(".archive-card");


archiveCards.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            (y - centerY) / 25;

        const rotateY =
            (centerX - x) / 25;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-20px)`;

    });


    card.addEventListener("mouseleave", function () {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0)";

    });

});


/* ================= MEMORY CARD ================= */

const memoryCard =
    document.querySelector(".memory-card");


memoryCard.addEventListener("mousemove", function (event) {

    const rect =
        memoryCard.getBoundingClientRect();


    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;


    const rotateY =
        (x - rect.width / 2) / 30;

    const rotateX =
        (rect.height / 2 - y) / 30;


    memoryCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.03)`;

});


memoryCard.addEventListener("mouseleave", function () {

    memoryCard.style.transform =
        "rotate(5deg)";

});


/* ================= CONSOLE ================= */

console.log(
    "✦ Archivio is alive — every favourite has a place."
);