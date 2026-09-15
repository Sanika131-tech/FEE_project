/* =====================================================
   ARCHIVIO
   DISCOVER PAGE
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const pageLoader =
        document.querySelector("#pageLoader");


    setTimeout(function () {

        pageLoader.classList.add("hidden");

    }, 650);

});



/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "archivioCurrentUser"
        )
    );


const navUserName =
    document.querySelector(
        "#navUserName"
    );


if (
    currentUser &&
    navUserName
) {

    navUserName.textContent =
        currentUser.firstName.toUpperCase();

}



/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryButtons =
    document.querySelectorAll(
        ".category-button"
    );


const catalogueCards =
    document.querySelectorAll(
        ".catalogue-card"
    );


categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedCategory =
                    button.dataset.category;


                categoryButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                catalogueCards.forEach(
                    function (card) {

                        const cardCategory =
                            card.dataset.category;


                        if (
                            selectedCategory === "all" ||
                            selectedCategory === cardCategory
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        }

                        else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);



/* =====================================================
   WHY THIS?
===================================================== */

const whyButton =
    document.querySelector(
        "#whyButton"
    );


const whyBox =
    document.querySelector(
        "#whyBox"
    );


whyButton.addEventListener(
    "click",
    function () {

        whyBox.classList.toggle(
            "visible"
        );


        if (
            whyBox.classList.contains(
                "visible"
            )
        ) {

            whyButton.innerHTML =
                'HIDE REASON <span>↗</span>';

        }

        else {

            whyButton.innerHTML =
                'TELL ME WHY <span>↗</span>';

        }

    }
);



/* =====================================================
   ARCHIVE STORAGE
===================================================== */

function getArchivioData() {

    return JSON.parse(
        localStorage.getItem(
            "archivioData"
        )
    ) || {

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
   ADD TO ARCHIVE
===================================================== */

const saveButtons =
    document.querySelectorAll(
        "[data-save]"
    );


saveButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const title =
                    button.dataset.save;


                const data =
                    getArchivioData();


                const alreadySaved =
                    data.archive.some(
                        function (item) {

                            return (
                                item.title === title
                            );

                        }
                    );


                if (alreadySaved) {

                    button.classList.add(
                        "saved"
                    );


                    if (
                        button.classList.contains(
                            "card-save"
                        )
                    ) {

                        button.textContent =
                            "✓";

                    }

                    else {

                        button.innerHTML =
                            "IN ARCHIVE <span>✓</span>";

                    }


                    return;

                }


                data.archive.push({

                    title: title,

                    addedAt:
                        new Date().toISOString(),

                    source: "discover"

                });


                saveArchivioData(
                    data
                );


                button.classList.add(
                    "saved"
                );


                if (
                    button.classList.contains(
                        "card-save"
                    )
                ) {

                    button.textContent =
                        "✓";

                }

                else {

                    button.innerHTML =
                        "IN ARCHIVE <span>✓</span>";

                }

            }
        );

    }
);



/* =====================================================
   RESTORE SAVED STATE
===================================================== */

const savedData =
    getArchivioData();


saveButtons.forEach(
    function (button) {

        const title =
            button.dataset.save;


        const alreadySaved =
            savedData.archive.some(
                function (item) {

                    return (
                        item.title === title
                    );

                }
            );


        if (alreadySaved) {

            button.classList.add(
                "saved"
            );


            if (
                button.classList.contains(
                    "card-save"
                )
            ) {

                button.textContent =
                    "✓";

            }

            else {

                button.innerHTML =
                    "IN ARCHIVE <span>✓</span>";

            }

        }

    }
);



/* =====================================================
   SURPRISE ME
===================================================== */

const surpriseItems = [

    "Rewatch Interstellar tonight.",

    "Read The Night Circus.",

    "Put on The Eminem Show.",

    "Watch Her after midnight.",

    "Open an old favourite from your archive.",

    "Find someone whose taste matches yours."

];


const surpriseButton =
    document.querySelector(
        "#surpriseButton"
    );


const bigSurpriseButton =
    document.querySelector(
        "#bigSurpriseButton"
    );


const surpriseResult =
    document.querySelector(
        "#surpriseResult"
    );



function surpriseMe() {

    const randomIndex =
        Math.floor(
            Math.random() *
            surpriseItems.length
        );


    surpriseResult.textContent =
        surpriseItems[randomIndex];

}



surpriseButton.addEventListener(
    "click",
    surpriseMe
);


bigSurpriseButton.addEventListener(
    "click",
    surpriseMe
);



/* =====================================================
   MOOD CARD INTERACTION
===================================================== */

const moodCards =
    document.querySelectorAll(
        ".mood-card"
    );


moodCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const title =
                    card.querySelector(
                        ".mood-title"
                    );


                if (!title) {

                    return;

                }


                const result =
                    title.textContent
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim();


                surpriseResult.textContent =
                    "Opening " +
                    result.toLowerCase() +
                    "...";


                window.scrollTo({

                    top:
                        document.querySelector(
                            ".catalogue-section"
                        ).offsetTop - 80,

                    behavior: "smooth"

                });

            }
        );

    }
);



/* =====================================================
   SIMPLE SCROLL REVEAL
===================================================== */

/* =====================================================
   PEOPLE YOU MIGHT LIKE
===================================================== */

const suggestedPeople = {

    jassleeen: {
        username: "@jassleeen",
        name: "Jassleeen",
        avatar: "J",
        bio: "Stories with a pulse.",
        archived: 42,
        followers: 1200,
        following: 186,
        note: "You both keep stories that stay with you."
    },

    sanika: {
        username: "@sanika",
        name: "Sanika",
        avatar: "S",
        bio: "Quiet stories, loud feelings.",
        archived: 67,
        followers: 980,
        following: 143,
        note: "You both seem drawn to emotional stories."
    },

    archive004: {
        username: "@archive_004",
        name: "Archive 004",
        avatar: "A",
        bio: "Films for strange nights.",
        archived: 31,
        followers: 742,
        following: 98,
        note: "Your archives overlap in unexpected places."
    },

    riya: {
        username: "@riya",
        name: "Riya",
        avatar: "R",
        bio: "Books, cinema and everything in between.",
        archived: 54,
        followers: 865,
        following: 201,
        note: "You share a love for stories with atmosphere."
    },

    karan: {
        username: "@karan",
        name: "Karan",
        avatar: "K",
        bio: "Collecting things worth remembering.",
        archived: 38,
        followers: 623,
        following: 154,
        note: "Your taste keeps crossing paths."
    }

};


/* =====================================================
   PROFILE MODAL
===================================================== */

const profileModal =
    document.querySelector("#profileModal");

const profileModalClose =
    document.querySelector("#profileModalClose");

const modalProfileAvatar =
    document.querySelector("#modalProfileAvatar");

const modalProfileHandle =
    document.querySelector("#modalProfileHandle");

const modalProfileName =
    document.querySelector("#modalProfileName");

const modalProfileBio =
    document.querySelector("#modalProfileBio");

const modalArchived =
    document.querySelector("#modalArchived");

const modalFollowers =
    document.querySelector("#modalFollowers");

const modalFollowing =
    document.querySelector("#modalFollowing");

const modalProfileNote =
    document.querySelector("#modalProfileNote");

const modalFollowButton =
    document.querySelector("#modalFollowButton");


let selectedPerson = null;


/* =====================================================
   GET CURRENT ARCHIVIO DATA
===================================================== */

function getArchivioData() {

    return JSON.parse(
        localStorage.getItem("archivioData")
    ) || {
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
   IS FOLLOWING?
===================================================== */

function isFollowing(username) {

    const data = getArchivioData();

    return data.follows.some(function (follow) {

        if (typeof follow === "string") {
            return follow === username;
        }

        return follow.username === username;

    });

}


/* =====================================================
   UPDATE FOLLOW BUTTON
===================================================== */

function updateFollowButton() {

    if (!selectedPerson) return;

    const following =
        isFollowing(selectedPerson.username);

    if (following) {

        modalFollowButton.textContent =
            "FOLLOWING";

        modalFollowButton.classList.add(
            "is-following"
        );

    } else {

        modalFollowButton.textContent =
            "FOLLOW";

        modalFollowButton.classList.remove(
            "is-following"
        );

    }

}


/* =====================================================
   OPEN PROFILE
===================================================== */

function openProfile(personKey) {

    const person =
        suggestedPeople[personKey];

    if (!person) return;

    selectedPerson = person;


    modalProfileAvatar.textContent =
        person.avatar;

    modalProfileHandle.textContent =
        person.username;

    modalProfileName.textContent =
        person.name;

    modalProfileBio.textContent =
        person.bio;

    modalArchived.textContent =
        person.archived;

    modalFollowers.textContent =
        person.followers;

    modalFollowing.textContent =
        person.following;

    modalProfileNote.textContent =
        person.note;


    updateFollowButton();


    profileModal.classList.add("open");

    profileModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE PROFILE
===================================================== */

function closeProfile() {

    profileModal.classList.remove("open");

    profileModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    selectedPerson = null;

}


/* =====================================================
   CLICK PEOPLE
===================================================== */

document
    .querySelectorAll(".suggestion-person")
    .forEach(function (personButton) {

        personButton.addEventListener(
            "click",
            function () {

                const personKey =
                    personButton.dataset.person;

                openProfile(personKey);

            }
        );

    });


/* =====================================================
   FOLLOW PERSON
===================================================== */

modalFollowButton.addEventListener(
    "click",
    function () {

        if (!selectedPerson) return;


        const data =
            getArchivioData();


        const existingIndex =
            data.follows.findIndex(function (follow) {

                if (typeof follow === "string") {
                    return follow === selectedPerson.username;
                }

                return follow.username ===
                    selectedPerson.username;

            });


        if (existingIndex === -1) {

            data.follows.push({
                username: selectedPerson.username,
                followedAt: new Date().toISOString()
            });

            selectedPerson.followers++;

        } else {

            data.follows.splice(
                existingIndex,
                1
            );

            selectedPerson.followers--;

        }


        saveArchivioData(data);

        modalFollowers.textContent =
            selectedPerson.followers;

        updateFollowButton();

        updateSuggestionButtons();

    }
);


/* =====================================================
   UPDATE ROW BUTTONS
===================================================== */

function updateSuggestionButtons() {

    document
        .querySelectorAll(".suggestion-person")
        .forEach(function (button) {

            const person =
                suggestedPeople[
                    button.dataset.person
                ];

            if (!person) return;


            if (isFollowing(person.username)) {

                button.classList.add(
                    "is-following"
                );

                button.querySelector(
                    ".suggestion-action"
                ).textContent = "Following";

            } else {

                button.classList.remove(
                    "is-following"
                );

                button.querySelector(
                    ".suggestion-action"
                ).textContent = "Follow";

            }

        });

}


updateSuggestionButtons();


/* =====================================================
   CLOSE MODAL
===================================================== */

profileModalClose.addEventListener(
    "click",
    closeProfile
);


document
    .querySelector(".profile-modal-backdrop")
    .addEventListener(
        "click",
        closeProfile
    );


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            profileModal.classList.contains("open")
        ) {

            closeProfile();

        }

    }
);


/* =====================================================
   CLUB DATA
===================================================== */

const suggestedClubs = {

    midnight: {
        name: "Midnight Screening",
        avatar: "M",
        description:
            "Films for people who prefer stories after dark.",
        members: 248
    },

    scifi: {
        name: "Soft Sci-Fi Society",
        avatar: "S",
        description:
            "Science fiction with heart, atmosphere and strange little worlds.",
        members: 96
    },

    books: {
        name: "Books That Changed Us",
        avatar: "B",
        description:
            "A club for books that leave something behind.",
        members: 183
    },

    strange: {
        name: "Strange Worlds",
        avatar: "W",
        description:
            "Stories that take you somewhere unfamiliar.",
        members: 121
    }

};


/* =====================================================
   CLUB JOINING
===================================================== */

function isClubJoined(clubKey) {

    const data =
        getArchivioData();

    return data.clubs.some(function (club) {

        if (typeof club === "string") {
            return club === clubKey;
        }

        return club.id === clubKey;

    });

}


function updateClubButtons() {

    document
        .querySelectorAll(".suggestion-club")
        .forEach(function (button) {

            const clubKey =
                button.dataset.club;

            const action =
                button.querySelector(
                    ".suggestion-action"
                );

            if (isClubJoined(clubKey)) {

                button.classList.add(
                    "is-joined"
                );

                action.textContent =
                    "Joined";

            } else {

                button.classList.remove(
                    "is-joined"
                );

                action.textContent =
                    "Join";

            }

        });

}


document
    .querySelectorAll(".suggestion-club")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const clubKey =
                    button.dataset.club;

                const club =
                    suggestedClubs[clubKey];

                if (!club) return;


                const data =
                    getArchivioData();


                const existingIndex =
                    data.clubs.findIndex(function (item) {

                        if (typeof item === "string") {
                            return item === clubKey;
                        }

                        return item.id === clubKey;

                    });


                if (existingIndex === -1) {

                    data.clubs.push({
                        id: clubKey,
                        joinedAt:
                            new Date().toISOString()
                    });

                } else {

                    data.clubs.splice(
                        existingIndex,
                        1
                    );

                }


                saveArchivioData(data);

                updateClubButtons();

            }
        );

    });


updateClubButtons();


/* =====================================================
   LOGIN PROTECTION
===================================================== */

const loggedIn =
    localStorage.getItem(
        "archivioLoggedIn"
    );


if (
    loggedIn !== "true" &&
    window.location.pathname.includes(
        "discover.html"
    )
) {

    window.location.href =
        "login.html";

}

/* =====================================================
   HERO MOVIE SLIDESHOW
===================================================== */

const heroSlides =
    document.querySelectorAll(".hero-slide");

const heroDots =
    document.querySelectorAll(".hero-dot");

let currentHeroSlide = 0;


/* ================= SHOW SLIDE ================= */

function showHeroSlide(index) {

    heroSlides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    heroDots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    heroSlides[index].classList.add("active");

    heroDots[index].classList.add("active");

    currentHeroSlide = index;

}


/* ================= AUTOMATIC SLIDESHOW ================= */

function nextHeroSlide() {

    let nextIndex =
        currentHeroSlide + 1;

    if (nextIndex >= heroSlides.length) {

        nextIndex = 0;

    }

    showHeroSlide(nextIndex);

}


if (heroSlides.length > 0) {

    setInterval(
        nextHeroSlide,
        5000
    );

}


/* ================= DOT CONTROLS ================= */

heroDots.forEach(function (dot) {

    dot.addEventListener(
        "click",
        function () {

            const slideIndex =
                Number(dot.dataset.slide);

            showHeroSlide(slideIndex);

        }
    );

});

/* =====================================================
   THEME SWITCHER
===================================================== */

/* =====================================================
   THEME SWITCHER
===================================================== */

const themeButton =
    document.querySelector("#themeButton");


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

    } else {

        document.body.classList.remove(
            "dark-theme"
        );

    }

}


/* ================= LOAD SAVED THEME ================= */

const savedTheme =
    localStorage.getItem(
        "archivioTheme"
    );


if (savedTheme === "dark") {

    applyTheme("dark");

} else {

    applyTheme("paper");

}


/* ================= CHANGE THEME ================= */

if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );


            if (isDark) {

                applyTheme("paper");

                localStorage.setItem(
                    "archivioTheme",
                    "paper"
                );

            } else {

                applyTheme("dark");

                localStorage.setItem(
                    "archivioTheme",
                    "dark"
                );

            }

        }
    );

}

/* =====================================================
   DISCOVER SEARCH
===================================================== */

const navSearch =
    document.querySelector("#navSearch");

const navSearchBox =
    document.querySelector(".nav-search");


/* =====================================================
   SEARCH DATABASE
===================================================== */

const searchItems = [

    {
        name: "Interstellar",
        type: "MOVIE",
        keywords: "interstellar movie space sci fi science fiction",
        target: ".catalogue-card"
    },

    {
        name: "Her",
        type: "MOVIE",
        keywords: "her movie romance technology",
        target: ".catalogue-card"
    },

    {
        name: "The Night Circus",
        type: "BOOK",
        keywords: "night circus book fantasy",
        target: ".catalogue-card"
    },

    {
        name: "The Secret History",
        type: "BOOK",
        keywords: "secret history book dark academia",
        target: ".catalogue-card"
    },

    {
        name: "The Eminem Show",
        type: "MUSIC",
        keywords: "eminem show music album rap",
        target: ".catalogue-card"
    },

    {
        name: "Project Hail Mary",
        type: "MOVIE",
        keywords: "project hail mary movie science fiction space",
        target: ".for-you-section"
    },

    {
        name: "Jassleeen",
        type: "PERSON",
        keywords: "jassleeen people stories pulse",
        target: '[data-person="jassleeen"]'
    },

    {
        name: "Sanika",
        type: "PERSON",
        keywords: "sanika people quiet stories feelings",
        target: '[data-person="sanika"]'
    },

    {
        name: "Archive 004",
        type: "PERSON",
        keywords: "archive 004 archive004 films strange nights",
        target: '[data-person="archive004"]'
    },

    {
        name: "Riya",
        type: "PERSON",
        keywords: "riya books cinema",
        target: '[data-person="riya"]'
    },

    {
        name: "Karan",
        type: "PERSON",
        keywords: "karan collecting favourites",
        target: '[data-person="karan"]'
    },

    {
        name: "Midnight Screening",
        type: "CLUB",
        keywords: "midnight screening movies films night",
        target: '[data-club="midnight"]'
    },

    {
        name: "Soft Sci-Fi Society",
        type: "CLUB",
        keywords: "soft sci fi science fiction space",
        target: '[data-club="scifi"]'
    },

    {
        name: "Books That Changed Us",
        type: "CLUB",
        keywords: "books changed us reading literature",
        target: '[data-club="books"]'
    },

    {
        name: "Strange Worlds",
        type: "CLUB",
        keywords: "strange worlds fantasy fiction",
        target: '[data-club="strange"]'
    }

];


/* =====================================================
   CREATE SEARCH RESULTS
===================================================== */

const searchResults =
    document.createElement("div");

searchResults.className =
    "nav-search-results";

searchResults.setAttribute(
    "aria-hidden",
    "true"
);

navSearchBox.appendChild(
    searchResults
);


/* =====================================================
   SEARCH FUNCTION
===================================================== */

function performSearch(query) {

    const cleanQuery =
        query
            .trim()
            .toLowerCase();


    searchResults.innerHTML = "";


    if (!cleanQuery) {

        searchResults.classList.remove(
            "show"
        );

        searchResults.setAttribute(
            "aria-hidden",
            "true"
        );

        return;

    }


    const matches =
        searchItems.filter(function (item) {

            return (
                item.name
                    .toLowerCase()
                    .includes(cleanQuery)
                ||
                item.keywords
                    .toLowerCase()
                    .includes(cleanQuery)
            );

        });


    if (matches.length === 0) {

        searchResults.innerHTML = `
            <div class="search-no-result">
                NOTHING FOUND
            </div>
        `;

    } else {

        matches
            .slice(0, 6)
            .forEach(function (item) {

                const result =
                    document.createElement("button");

                result.className =
                    "search-result";

                result.type =
                    "button";


                result.innerHTML = `
                    <span class="search-result-type">
                        ${item.type}
                    </span>

                    <span class="search-result-name">
                        ${item.name}
                    </span>

                    <span class="search-result-arrow">
                        ↗
                    </span>
                `;


                result.addEventListener(
                    "click",
                    function () {

                        goToSearchResult(item);

                    }
                );


                searchResults.appendChild(
                    result
                );

            });

    }


    searchResults.classList.add(
        "show"
    );

    searchResults.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =====================================================
   GO TO RESULT
===================================================== */

function goToSearchResult(item) {

    const target =
        document.querySelector(
            item.target
        );


    if (!target) {

        searchResults.classList.remove(
            "show"
        );

        return;

    }


    target.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    target.classList.add(
        "search-highlight"
    );


    setTimeout(
        function () {

            target.classList.remove(
                "search-highlight"
            );

        },
        1800
    );


    navSearch.value = "";

    searchResults.classList.remove(
        "show"
    );

}


/* =====================================================
   LIVE SEARCH
===================================================== */

if (navSearch) {

    navSearch.addEventListener(
        "input",
        function () {

            performSearch(
                navSearch.value
            );

        }
    );

}


/* =====================================================
   ENTER KEY
===================================================== */

if (navSearch) {

    navSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                const firstResult =
                    searchResults.querySelector(
                        ".search-result"
                    );


                if (firstResult) {

                    firstResult.click();

                }

            }

        }
    );

}


/* =====================================================
   CLOSE SEARCH WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            navSearchBox &&
            !navSearchBox.contains(event.target)
        ) {

            searchResults.classList.remove(
                "show"
            );

        }

    }
);