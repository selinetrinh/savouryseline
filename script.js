// menu toggle
const menuIcon = document.getElementById("menu-icon");
const menuBar = document.getElementById("menu-bar");
const homeIcon = document.getElementById("home-icon");
const closeMenu = document.getElementById("close-menu");
const logo = document.querySelector(".logo");
const biteButton = document.querySelector(".bite-nav-button");
const biteImages = document.querySelectorAll("#bite-img, #mobile-bite-img");
const sipButton = document.querySelector(".sip-nav-button");
const sipImages = document.querySelectorAll("#sip-img, #mobile-sip-img");

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

biteImages.forEach(function(image) {
    image.addEventListener("click", function() {
        window.location.href = "have-a-bite.html";
    });

    image.addEventListener("mouseenter", function() {
        biteButton?.classList.add("image-hovered");
    });

    image.addEventListener("mouseleave", function() {
        biteButton?.classList.remove("image-hovered");
    });
});

sipImages.forEach(function(image) {
    image.addEventListener("click", function() {
        window.location.href = "have-a-sip.html";
    });

    image.addEventListener("mouseenter", function() {
        sipButton?.classList.add("image-hovered");
    });

    image.addEventListener("mouseleave", function() {
        sipButton?.classList.remove("image-hovered");
    });
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

// Let ingredient PNGs on individual recipe pages behave like movable stickers.
document.querySelectorAll('.sticker').forEach(function(sticker) {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragStartX = 0;
    let dragStartY = 0;

    sticker.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });

    sticker.addEventListener('pointerdown', function(event) {
        if (event.button !== 0 && event.pointerType !== 'touch') return;

        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        dragStartX = Number.parseFloat(sticker.dataset.dragX || '0');
        dragStartY = Number.parseFloat(sticker.dataset.dragY || '0');

        sticker.setPointerCapture(event.pointerId);
        sticker.classList.add('is-dragging');
    });

    sticker.addEventListener('pointermove', function(event) {
        if (!sticker.hasPointerCapture(event.pointerId)) return;

        const dragX = dragStartX + event.clientX - pointerStartX;
        const dragY = dragStartY + event.clientY - pointerStartY;

        sticker.dataset.dragX = dragX;
        sticker.dataset.dragY = dragY;
        sticker.style.translate = `${dragX}px ${dragY}px`;
    });

    function stopDragging(event) {
        sticker.classList.remove('is-dragging');
        if (sticker.hasPointerCapture(event.pointerId)) {
            sticker.releasePointerCapture(event.pointerId);
        }
    }

    sticker.addEventListener('pointerup', stopDragging);
    sticker.addEventListener('pointercancel', stopDragging);
});
