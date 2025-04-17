document.querySelectorAll('.music-player').forEach(player => {
    const trackName = player.dataset.track;
    const src = player.dataset.src;

    // Create audio element
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.muted = true;

    function tryPlay() {
        audio.play().then(() => {
            audio.muted = false; // allow actual volume control
        }).catch(err => {
            console.warn('Autoplay still blocked:', err.message);
        });
    }

    tryPlay();

    // Retry on user interaction
    window.addEventListener('click', tryPlay, { once: true });

    // Add track name
    const nameEl = document.createElement('div');
    nameEl.className = 'track-name';
    nameEl.textContent = trackName;
    player.appendChild(nameEl);

    // Create volume bar
    const bar = document.createElement('div');
    bar.className = 'volume-bar';

    const handle = document.createElement('div');
    handle.className = 'volume-handle';
    handle.style.left = `${audio.volume * 234 - 5}px`;

    bar.appendChild(handle);
    player.appendChild(bar);

    // Store audio reference on player for later control
    player._audio = audio;

    // Function to stop other players
    function stopOtherPlayers() {
        document.querySelectorAll('.music-player').forEach(p => {
            if (p !== player && p._audio) {
                p._audio.pause();
                p._audio.currentTime = 0;
            }
        });
    }

    // Volume change logic
    bar.addEventListener('click', (e) => {
        stopOtherPlayers();

        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const volume = Math.min(Math.max(clickX / 234, 0), 1);
        audio.volume = volume;
        audio.muted = false;
        audio.play();
        handle.style.left = `${volume * 234 - 5}px`;
    });

    // Drag handle
    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        stopOtherPlayers();

        const onMouseMove = (e) => {
            const rect = bar.getBoundingClientRect();
            let x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, 234));
            const volume = x / 234;
            audio.volume = volume;
            audio.muted = false;
            audio.play();
            handle.style.left = `${x - 5}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});