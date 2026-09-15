/* =====================================================
   ARCHIVIO
   ARCHIVE PAGE
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const pageLoader =
        document.querySelector("#pageLoader");

    setTimeout(function () {

        if (pageLoader) {
            pageLoader.classList.add("hidden");
        }

    }, 650);

});



/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("archivioCurrentUser")
    );


/* Protect the page */

if (
    localStorage.getItem("archivioLoggedIn") !== "true"
) {

    window.location.href = "login.html";

}


/* Display user */

const navUserName =
    document.querySelector("#navUserName");

const navProfileDot =
    document.querySelector("#navProfileDot");


if (currentUser) {

    if (navUserName) {

        navUserName.textContent =
            currentUser.firstName.toUpperCase();

    }


    if (navProfileDot) {

        navProfileDot.textContent =
            currentUser.firstName
                .charAt(0)
                .toUpperCase();

    }

}



/* =====================================================
   ARCHIVIO STORAGE
===================================================== */


/*
    We use the SAME storage system
    as Discover.

    archivioData = {
        archive: [],
        collections: [],
        reviews: [],
        follows: [],
        clubs: []
    }
*/


function getArchivioData() {

    const saved =
        JSON.parse(
            localStorage.getItem("archivioData")
        );

    return saved || {

        archive: [],
        collections: [],
        reviews: [],
        follows: [],
        clubs: []

    };

}



function saveArchivioData(data) {

    localStorage.setItem(
        "archivioData",
        JSON.stringify(data)
    );

}



/* =====================================================
   ARCHIVE DATA
===================================================== */

let archivioData =
    getArchivioData();

let archiveItems =
    archivioData.archive || [];



/* =====================================================
   IMAGE DATABASE
===================================================== */


/*
    Discover currently stores the title
    of the archived item.

    So Archive uses the title to find
    the correct poster.
*/

const mediaDatabase = {

    "Interstellar": {

        type: "movie",

        genre: "SCIENCE FICTION",

        year: "2014",

        image:
            "../assets/landing/interstellar.jpeg"

    },


    "Project Hail Mary": {

        type: "movie",

        genre: "SCIENCE FICTION",

        year: "2026",

        image:
            "../assets/landing/project-hail-mary-poster.jpeg"

    },


    "Her": {

        type: "movie",

        genre: "ROMANCE / DRAMA",

        year: "2013",

        image:
            "../assets/landing/her-poster.jpeg"

    },


    "The Night Circus": {

        type: "book",

        genre: "FANTASY",

        year: "2011",

        image:
            "../assets/landing/night-circus.jpeg"

    },


    "The Eminem Show": {

        type: "music",

        genre: "HIP-HOP",

        year: "2002",

        image:
            "../assets/landing/the-eminem-show.jpeg"

    },


    "The Secret History": {

        type: "book",

        genre: "LITERARY FICTION",

        year: "1992",

        image:
            "../assets/landing/secret-history.jpeg"

    }

};



/* =====================================================
   FALLBACK IMAGE
===================================================== */

const fallbackImage =
    "../assets/landing/interstellar.jpeg";



/* =====================================================
   CURRENT FILTER + SEARCH + SORT
===================================================== */

let activeFilter = "all";

let searchTerm = "";

let sortMode = "newest";



/* =====================================================
   DOM ELEMENTS
===================================================== */

const archiveGrid =
    document.querySelector("#archiveGrid");

const emptyArchive =
    document.querySelector("#emptyArchive");

const archiveSearch =
    document.querySelector("#archiveSearch");

const sortArchive =
    document.querySelector("#sortArchive");

const filterButtons =
    document.querySelectorAll(".filter-button");

const clearArchiveButton =
    document.querySelector("#clearArchive");



/* =====================================================
   STATISTICS
===================================================== */

function updateStatistics(items) {

    const totalArchived =
        document.querySelector("#totalArchived");

    const movieCount =
        document.querySelector("#movieCount");

    const bookCount =
        document.querySelector("#bookCount");

    const musicCount =
        document.querySelector("#musicCount");


    let movies = 0;

    let books = 0;

    let music = 0;


    items.forEach(function (item) {

        const media =
            mediaDatabase[item.title];


        if (!media) {
            return;
        }


        if (media.type === "movie") {
            movies++;
        }


        if (media.type === "book") {
            books++;
        }


        if (media.type === "music") {
            music++;
        }

    });


    if (totalArchived) {

        totalArchived.textContent =
            items.length;

    }


    if (movieCount) {

        movieCount.textContent =
            movies;

    }


    if (bookCount) {

        bookCount.textContent =
            books;

    }


    if (musicCount) {

        musicCount.textContent =
            music;

    }

}



/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "RECENTLY";
    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {
        return "RECENTLY";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ).toUpperCase();

}



/* =====================================================
   FILTER + SORT ITEMS
===================================================== */

function getVisibleItems() {

    let items =
        [...archiveItems];


    /* SEARCH */

    if (searchTerm) {

        items =
            items.filter(function (item) {

                const title =
                    item.title
                        .toLowerCase();

                return title.includes(
                    searchTerm
                );

            });

    }


    /* CATEGORY */

    if (activeFilter !== "all") {

        items =
            items.filter(function (item) {

                const media =
                    mediaDatabase[item.title];

                return (
                    media &&
                    media.type === activeFilter
                );

            });

    }


    /* SORT */

    if (sortMode === "newest") {

        items.sort(function (a, b) {

            return new Date(b.addedAt || 0)
                -
                new Date(a.addedAt || 0);

        });

    }


    if (sortMode === "oldest") {

        items.sort(function (a, b) {

            return new Date(a.addedAt || 0)
                -
                new Date(b.addedAt || 0);

        });

    }


    if (sortMode === "az") {

        items.sort(function (a, b) {

            return a.title
                .localeCompare(b.title);

        });

    }


    if (sortMode === "za") {

        items.sort(function (a, b) {

            return b.title
                .localeCompare(a.title);

        });

    }


    return items;

}



/* =====================================================
   CREATE ARCHIVE CARD
===================================================== */

function createArchiveCard(item, index) {

    const media =
        mediaDatabase[item.title] || {

            type: "movie",

            genre: "ARCHIVE ENTRY",

            year: "",

            image: fallbackImage

        };


    const card =
        document.createElement("article");

    card.className =
        "archive-card";


    card.dataset.title =
        item.title;


    const note =
        item.note || "";


    card.innerHTML = `

        <img
            class="archive-card-image"
            src="${media.image}"
            alt="${item.title}"
        >


        <div class="archive-card-overlay"></div>


        <div class="archive-card-top">

            <span class="archive-card-number">
                ${String(index + 1).padStart(3, "0")}
            </span>


            <button
                class="remove-card"
                type="button"
                aria-label="Remove ${item.title}"
                data-remove="${item.title}"
            >
                ×
            </button>

        </div>


        <div class="archive-card-content">

            <div class="archive-card-meta">

                <span>
                    ${media.type.toUpperCase()}
                </span>

                <span>
                    ${media.genre}
                </span>

            </div>


            <h3 class="archive-card-title">
                ${item.title}
            </h3>


            <p class="archive-card-date">
                ARCHIVED ${formatDate(item.addedAt)}
            </p>


            <button
                class="archive-note-button"
                type="button"
                data-note="${item.title}"
            >
                ${note
                    ? "VIEW / EDIT NOTE"
                    : "WHY I SAVED THIS →"
                }
            </button>

        </div>

    `;


    return card;

}



/* =====================================================
   RENDER ARCHIVE
===================================================== */

function renderArchive() {

    if (!archiveGrid) {
        return;
    }


    archiveGrid.innerHTML = "";


    const visibleItems =
        getVisibleItems();


    /* Nothing at all */

    if (archiveItems.length === 0) {

        archiveGrid.style.display = "none";

        emptyArchive.classList.add("visible");

        return;

    }


    /* Something exists but search/filter
       found nothing */

    if (visibleItems.length === 0) {

        archiveGrid.style.display = "none";

        emptyArchive.classList.remove(
            "visible"
        );


        archiveGrid.style.display =
            "grid";


        archiveGrid.innerHTML = `

            <div
                class="timeline-empty"
                style="grid-column:1/-1;"
            >

                NO MATCHES FOUND IN YOUR ARCHIVE.

                <br><br>

                Try another title or category.

            </div>

        `;


        return;

    }


    emptyArchive.classList.remove(
        "visible"
    );


    archiveGrid.style.display =
        "grid";


    visibleItems.forEach(
        function (item, index) {

            const card =
                createArchiveCard(
                    item,
                    index
                );

            archiveGrid.appendChild(card);

        }
    );


    attachCardEvents();

}



/* =====================================================
   REMOVE ARCHIVE ITEM
===================================================== */

function removeArchiveItem(title) {

    const confirmed =
        confirm(
            `Remove "${title}" from your archive?`
        );


    if (!confirmed) {
        return;
    }


    archiveItems =
        archiveItems.filter(
            function (item) {

                return item.title !== title;

            }
        );


    archivioData.archive =
        archiveItems;


    saveArchivioData(
        archivioData
    );


    renderArchive();

    renderTimeline();

}



/* =====================================================
   CARD EVENTS
===================================================== */

function attachCardEvents() {


    /* REMOVE BUTTONS */

    const removeButtons =
        document.querySelectorAll(
            "[data-remove]"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    removeArchiveItem(
                        button.dataset.remove
                    );

                }
            );

        }
    );



    /* NOTE BUTTONS */

    const noteButtons =
        document.querySelectorAll(
            "[data-note]"
        );


    noteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    openNoteModal(
                        button.dataset.note
                    );

                }
            );

        }
    );

}



/* =====================================================
   FILTER BUTTONS
===================================================== */

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                activeFilter =
                    button.dataset.filter;


                renderArchive();

            }
        );

    }
);



/* =====================================================
   SEARCH
===================================================== */

if (archiveSearch) {

    archiveSearch.addEventListener(
        "input",
        function () {

            searchTerm =
                archiveSearch.value
                    .trim()
                    .toLowerCase();


            renderArchive();

        }
    );

}



/* =====================================================
   SORT
===================================================== */

if (sortArchive) {

    sortArchive.addEventListener(
        "change",
        function () {

            sortMode =
                sortArchive.value;


            renderArchive();

        }
    );

}



/* =====================================================
   CLEAR ARCHIVE
===================================================== */

if (clearArchiveButton) {

    clearArchiveButton.addEventListener(
        "click",
        function () {

            if (archiveItems.length === 0) {

                alert(
                    "Your archive is already empty."
                );

                return;

            }


            const confirmed =
                confirm(
                    "Clear your entire archive?"
                );


            if (!confirmed) {
                return;
            }


            archivioData.archive = [];

            archiveItems = [];


            saveArchivioData(
                archivioData
            );


            renderArchive();

            renderTimeline();

        }
    );

}



/* =====================================================
   TIMELINE
===================================================== */

function renderTimeline() {

    const timeline =
        document.querySelector(
            "#archiveTimeline"
        );


    if (!timeline) {
        return;
    }


    timeline.innerHTML = "";


    const sortedItems =
        [...archiveItems].sort(
            function (a, b) {

                return new Date(b.addedAt || 0)
                    -
                    new Date(a.addedAt || 0);

            }
        );


    if (sortedItems.length === 0) {

        timeline.innerHTML = `

            <div class="timeline-empty">

                Your archive history will appear here
                as you start keeping things.

            </div>

        `;

        return;

    }


    sortedItems.forEach(
        function (item) {

            const media =
                mediaDatabase[item.title] || {

                    type: "archive entry"

                };


            const timelineItem =
                document.createElement(
                    "div"
                );


            timelineItem.className =
                "timeline-item";


            timelineItem.innerHTML = `

                <div class="timeline-date">

                    ${formatDate(item.addedAt)}

                </div>


                <span class="timeline-dot"></span>


                <div class="timeline-entry">

                    <div class="timeline-entry-info">

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${media.type.toUpperCase()}
                            / ARCHIVED FROM
                            ${(item.source || "ARCHIVIO").toUpperCase()}
                        </p>

                    </div>


                    <span class="timeline-arrow">
                        ↗
                    </span>

                </div>

            `;


            timeline.appendChild(
                timelineItem
            );

        }
    );

}



/* =====================================================
   NOTE MODAL
===================================================== */

const noteModal =
    document.querySelector(
        "#noteModal"
    );

const noteModalTitle =
    document.querySelector(
        "#noteModalTitle"
    );

const noteModalSubtitle =
    document.querySelector(
        "#noteModalSubtitle"
    );

const archiveNoteInput =
    document.querySelector(
        "#archiveNoteInput"
    );

const noteModalClose =
    document.querySelector(
        "#noteModalClose"
    );

const noteCancel =
    document.querySelector(
        "#noteCancel"
    );

const noteSave =
    document.querySelector(
        "#noteSave"
    );


let noteEditingTitle = null;



/* OPEN MODAL */

function openNoteModal(title) {

    noteEditingTitle =
        title;


    const item =
        archiveItems.find(
            function (archiveItem) {

                return archiveItem.title === title;

            }
        );


    const existingNote =
        item && item.note
            ? item.note
            : "";


    noteModalTitle.textContent =
        `Why I saved ${title}.`;


    noteModalSubtitle.textContent =
        "Add a small memory to this archive entry.";


    archiveNoteInput.value =
        existingNote;


    noteModal.classList.add(
        "visible"
    );


    noteModal.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(
        function () {

            archiveNoteInput.focus();

        },
        200
    );

}



/* CLOSE MODAL */

function closeNoteModal() {

    noteModal.classList.remove(
        "visible"
    );


    noteModal.setAttribute(
        "aria-hidden",
        "true"
    );


    noteEditingTitle = null;

}



/* CLOSE BUTTONS */

if (noteModalClose) {

    noteModalClose.addEventListener(
        "click",
        closeNoteModal
    );

}


if (noteCancel) {

    noteCancel.addEventListener(
        "click",
        closeNoteModal
    );

}



/* CLICK OUTSIDE */

if (noteModal) {

    noteModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === noteModal
            ) {

                closeNoteModal();

            }

        }
    );

}



/* ESCAPE */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            noteModal.classList.contains(
                "visible"
            )
        ) {

            closeNoteModal();

        }

    }
);



/* SAVE NOTE */

if (noteSave) {

    noteSave.addEventListener(
        "click",
        function () {

            if (!noteEditingTitle) {
                return;
            }


            const item =
                archiveItems.find(
                    function (archiveItem) {

                        return (
                            archiveItem.title ===
                            noteEditingTitle
                        );

                    }
                );


            if (!item) {
                return;
            }


            item.note =
                archiveNoteInput.value.trim();


            archivioData.archive =
                archiveItems;


            saveArchivioData(
                archivioData
            );


            renderArchive();


            closeNoteModal();

        }
    );

}



/* =====================================================
   SURPRISE ME
===================================================== */

const archiveSurpriseBtn =
    document.querySelector(
        "#archiveSurpriseBtn"
    );

const surpriseResult =
    document.querySelector(
        "#surpriseResult"
    );


if (archiveSurpriseBtn) {

    archiveSurpriseBtn.addEventListener(
        "click",
        function () {

            if (archiveItems.length === 0) {

                surpriseResult.textContent =
                    "Your archive is waiting for its first favourite.";

                return;

            }


            const randomIndex =
                Math.floor(
                    Math.random() *
                    archiveItems.length
                );


            const randomItem =
                archiveItems[randomIndex];


            surpriseResult.textContent =
                `Tonight, revisit ${randomItem.title}.`;

        }
    );

}



/* =====================================================
   DARK MODE
===================================================== */

const themeButton =
    document.querySelector(
        "#themeButton"
    );


const savedTheme =
    localStorage.getItem(
        "archivioTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-theme"
    );

}



if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-theme"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );


            localStorage.setItem(
                "archivioTheme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}



/* =====================================================
   INITIAL RENDER
===================================================== */

updateStatistics(
    archiveItems
);

renderArchive();

renderTimeline();



/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "Archivio Archive loaded successfully."
);

console.log(
    "Archived items:",
    archiveItems
);

/* =====================================================
   ARCHIVE HERO SLIDESHOW
===================================================== */

const heroSlides =
    document.querySelectorAll(
        ".archive-hero-slide"
    );

const heroDots =
    document.querySelectorAll(
        ".archive-hero-dot"
    );


let currentHeroSlide = 0;


/* CHANGE SLIDE */

function changeHeroSlide(index) {

    if (!heroSlides.length) {
        return;
    }


    heroSlides.forEach(
        function (slide) {

            slide.classList.remove(
                "active"
            );

        }
    );


    heroDots.forEach(
        function (dot) {

            dot.classList.remove(
                "active"
            );

        }
    );


    heroSlides[index].classList.add(
        "active"
    );


    if (heroDots[index]) {

        heroDots[index].classList.add(
            "active"
        );

    }


    currentHeroSlide = index;

}



/* AUTOMATIC SLIDESHOW */

if (heroSlides.length) {

    setInterval(
        function () {

            currentHeroSlide =
                (currentHeroSlide + 1)
                % heroSlides.length;


            changeHeroSlide(
                currentHeroSlide
            );

        },
        5000
    );

}



/* DOT CONTROLS */

heroDots.forEach(
    function (dot) {

        dot.addEventListener(
            "click",
            function () {

                const slideIndex =
                    Number(
                        dot.dataset.slide
                    );


                changeHeroSlide(
                    slideIndex
                );

            }
        );

    }
);