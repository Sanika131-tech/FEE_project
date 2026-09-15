/* =====================================================
   ARCHIVIO
   PROFILE PAGE
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener(
    "load",
    function () {

        const loader =
            document.querySelector(
                "#profileLoader"
            );


        setTimeout(
            function () {

                if (loader) {

                    loader.classList.add(
                        "hidden"
                    );

                }

            },
            650
        );

    }
);



/* =====================================================
   LOGIN PROTECTION
===================================================== */

if (
    localStorage.getItem(
        "archivioLoggedIn"
    ) !== "true"
) {

    window.location.href =
        "login.html";

}



/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "archivioCurrentUser"
        )
    );



/* =====================================================
   USER INFORMATION
===================================================== */

const profileName =
    document.querySelector(
        "#profileName"
    );


const profileHandle =
    document.querySelector(
        "#profileHandle"
    );


const profileInitial =
    document.querySelector(
        "#profileInitial"
    );



if (currentUser) {

    const firstName =
        currentUser.firstName || "Anishka";


    const lastName =
        currentUser.lastName || "";


    const fullName =
        `${firstName} ${lastName}`.trim();


    const handle =
        "@" +
        firstName
            .toLowerCase()
            .replace(/\s+/g, "");


    if (profileName) {

        profileName.textContent =
            fullName;

    }


    if (profileHandle) {

        profileHandle.textContent =
            handle;

    }


    if (profileInitial) {

        profileInitial.textContent =
            firstName
                .charAt(0)
                .toUpperCase();

    }

}



/* =====================================================
   ARCHIVIO STORAGE
===================================================== */

function getArchivioData() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "archivioData"
            )
        );


    return saved || {

        archive: [],

        collections: [],

        reviews: [],

        follows: [],

        clubs: []

    };

}



const archivioData =
    getArchivioData();


let archiveItems =
    archivioData.archive || [];



/* =====================================================
   MEDIA DATABASE
===================================================== */

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
   DEMO ITEMS
===================================================== */

/*
    These are only shown when the user
    has not archived anything yet.

    Once real items are added through
    Discover, those real items appear.
*/

const demoItems = [

    "Interstellar",

    "Her",

    "The Night Circus",

    "The Eminem Show"

];



/* =====================================================
   ARCHIVE GRID
===================================================== */

const archiveGrid =
    document.querySelector(
        "#profileArchiveGrid"
    );



function getDisplayItems() {

    if (
        archiveItems.length > 0
    ) {

        return archiveItems;

    }


    return demoItems;

}



/* =====================================================
   RENDER ARCHIVE
===================================================== */

function renderArchive(
    filter = "all"
) {

    if (!archiveGrid) {

        return;

    }


    archiveGrid.innerHTML = "";


    let items =
        getDisplayItems();


    if (filter !== "all") {

        items =
            items.filter(
                function (item) {

                    const title =
                        typeof item === "string"
                            ? item
                            : item.title;


                    const media =
                        mediaDatabase[
                            title
                        ];


                    return (
                        media &&
                        media.type === filter
                    );

                }
            );

    }


    if (items.length === 0) {

        archiveGrid.innerHTML = `

            <div class="profile-empty">

                <h3>
                    Nothing
                    <em>here yet.</em>
                </h3>

                <p>
                    Explore Discover and save
                    something worth keeping.
                </p>

            </div>

        `;

        return;

    }



    items.forEach(
        function (item, index) {


            const title =
                typeof item === "string"
                    ? item
                    : item.title;


            const media =
                mediaDatabase[
                    title
                ];


            if (!media) {

                return;

            }


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "archive-profile-card";


            card.innerHTML = `

                <img
                    src="${media.image}"
                    alt="${title}"
                >


                <div
                    class="archive-profile-overlay"
                ></div>


                <span
                    class="archive-profile-number"
                >
                    ${String(index + 1).padStart(2, "0")}
                </span>


                <div
                    class="archive-profile-info"
                >

                    <p
                        class="archive-profile-type"
                    >
                        ${media.type.toUpperCase()}
                        / ${media.genre}
                    </p>


                    <h3>
                        ${title}
                    </h3>


                    <p
                        class="archive-profile-year"
                    >
                        ${media.year}
                    </p>

                </div>

            `;


            archiveGrid.appendChild(
                card
            );

        }
    );

}



/* INITIAL */

renderArchive();



/* =====================================================
   FILTERS
===================================================== */

const profileFilters =
    document.querySelectorAll(
        ".profile-filter"
    );


profileFilters.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                profileFilters.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                renderArchive(
                    button.dataset.filter
                );

            }
        );

    }
);



/* =====================================================
   STATISTICS
===================================================== */

const archiveCount =
    archiveItems.length;


const collectionCount =
    archivioData.collections
        ? archivioData.collections.length
        : 0;


const reviewCount =
    archivioData.reviews
        ? archivioData.reviews.length
        : 0;


const followingCount =
    archivioData.follows
        ? archivioData.follows.length
        : 0;



document.querySelector(
    "#profileArchiveCount"
).textContent =
    archiveCount || 4;


document.querySelector(
    "#profileCollectionCount"
).textContent =
    collectionCount || 3;


document.querySelector(
    "#profileReviewCount"
).textContent =
    reviewCount;


document.querySelector(
    "#profileFollowingCount"
).textContent =
    followingCount;



/* =====================================================
   YEAR BUTTON
===================================================== */

const yearButton =
    document.querySelector(
        "#yearButton"
    );


if (yearButton) {

    yearButton.addEventListener(
        "click",
        function () {

            alert(
                "Your Archivio yearbook is coming soon."
            );

        }
    );

}