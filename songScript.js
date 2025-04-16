// Music Playlist
document.addEventListener("DOMContentLoaded", function() {
    loadSong(0);
});

const songs = [
    { name: "At The Beach", src: "music/waves.mp3", avatar: "music/AfterHours_avatar.png" },
    { name: "Coffee Shop", src: "music/cafeshop.mp3", avatar: "music/AfterHours_avatar.png" },
    { name: "Rainy Days", src: "music/rain.mp3", avatar: "music/AfterHours_avatar.png" },
    { name: "In The Garden", src: "music/birdschirping.mp3", avatar: "music/AfterHours_avatar.png" },
]

let currentSongIndex = 0;
const audio = document.getElementById("background-music");
const playBtn = document.getElementById("play-pause-btn");
const playPauseIcon = document.getElementById("play-pause-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeIcon = document.getElementById("volume-icon");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const songAvatar = document.getElementById("song-avatar");

// Load a Song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    songAvatar.src = song.avatar;
    audio.play();
    playPauseIcon.src = "icons/play.png";
}

// Play / Pause Button
playBtn.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = "icons/pause.png"; // Change to pause icon
    } else {
        audio.pause();
        playPauseIcon.src = "icons/play.png"; // Change back to play icon
    }
});

// Next Song
nextBtn.addEventListener("click", function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Previous Song
prevBtn.addEventListener("click", function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Update Progress Bar
audio.addEventListener("timeupdate", function() {
    if (!isNaN(audio.duration)) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Seek Audio
progressBar.addEventListener("input", function() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume Slider
const volumeSlider = document.getElementById("volume-slider"); // Ensure this exists in your HTML

volumeIcon.addEventListener("click", function() {
    volumeBar.style.display = volumeBar.style.display === "block" ? "none" : "block";
});

// Adjust Audio Volume
volumeSlider.addEventListener("input", function() {
    let volumeValue = volumeSlider.value / 100; // Convert 0-100 range to 0.0-1.0
    audio.volume = volumeValue;
    volumeFill.style.height = (volumeValue * 100) + "%"; // Adjust fill height
});