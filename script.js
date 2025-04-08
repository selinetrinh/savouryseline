// menu toggle
document.getElementById("menu-icon").addEventListener("click", function() {
    document.getElementById("menu-bar").classList.toggle("menu-open");
});

// back to homepage button
document.getElementById("home-icon").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirect to the homepage
});

// close menu bar button
document.getElementById("close-menu").addEventListener("click", function() {
    document.getElementById("menu-bar").classList.remove("menu-open");
});

// letter animation
const envelope = document.querySelector('img.envelope');
const letter = document.querySelector('img.letter');
const cancelBtn = document.getElementById('cancelBtn');

envelope.addEventListener('click', () => {
    letter.classList.remove('hidden');
    letter.classList.add('show');
});

letter.addEventListener('click', () => {
    letter.classList.remove('show');
    letter.classList.add('hidden');
});