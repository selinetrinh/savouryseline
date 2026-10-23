// menu toggle
const menuIcon = document.getElementById("menu-icon");
const menuBar = document.getElementById("menu-bar");
const homeIcon = document.getElementById("home-icon");
const closeMenu = document.getElementById("close-menu");
const logo = document.querySelector(".logo");

menuIcon?.addEventListener("click", function() {
    menuBar?.classList.toggle("menu-open");
});

// back to homepage button
homeIcon?.addEventListener("click", function() {
    window.location.href = "index.html";
});

// close menu bar button
closeMenu?.addEventListener("click", function() {
    menuBar?.classList.remove("menu-open");
});

document.addEventListener("click", function(event) {
    const clickedOutsideMenu = !menuBar?.contains(event.target) && event.target !== menuIcon;

    if (menuBar?.classList.contains("menu-open") && clickedOutsideMenu) {
        menuBar.classList.remove("menu-open");
    }
});

logo?.addEventListener("click", function() {
    window.location.href = "index.html";
});

// Hide the header while moving down the page, and reveal it on upward scroll.
let lastHeaderScrollY = window.scrollY;

window.addEventListener("scroll", function() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 60) {
        document.body.classList.remove("header-hidden");
        lastHeaderScrollY = currentScrollY;
    } else if (currentScrollY > lastHeaderScrollY + 6) {
        document.body.classList.add("header-hidden");
        lastHeaderScrollY = currentScrollY;
    } else if (currentScrollY < lastHeaderScrollY - 6) {
        document.body.classList.remove("header-hidden");
        lastHeaderScrollY = currentScrollY;
    }
}, { passive: true });

// letter animation
const envelope = document.querySelector('img.envelope');
const letter = document.querySelector('img.letter');
const cancelBtn = document.getElementById('cancelBtn');

envelope?.addEventListener('click', () => {
    letter.classList.remove('hidden');
    letter.classList.add('show');
});

letter?.addEventListener('click', () => {
    letter.classList.remove('show');
    letter.classList.add('hidden');
});
