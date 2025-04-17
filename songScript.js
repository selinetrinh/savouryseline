const allAudio = [];

document.querySelectorAll('.music-player').forEach(player => {
    const trackName = player.dataset.track;
    const src = player.dataset.src;

    // Create audio element
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.muted = true;
    allAudio.push(audio);

    function tryPlay() {
        audio.play().then(() => {
            audio.muted = false;
        }).catch(err => {
            console.warn('Autoplay still blocked:', err.message);
        });
    }

    tryPlay();

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
    handle.style.left = `-5px`; // start at zero
    bar.appendChild(handle);
    player.appendChild(bar);

    function setVolume(volume) {
        // Pause all others if this volume > 0
        if (volume > 0) {
            allAudio.forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.volume = 0;
                }
            });
            audio.volume = volume;
            if (audio.paused) {
                audio.play().catch(() => {}); // in case Safari still blocks
            }
        } else {
            audio.volume = 0;
            audio.pause();
        }
        handle.style.left = `${volume * 234 - 5}px`;
    }

    bar.addEventListener('click', (e) => {
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const volume = Math.min(Math.max(clickX / 234, 0), 1);
        setVolume(volume);
    });

    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const onMouseMove = (e) => {
            const rect = bar.getBoundingClientRect();
            let x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, 234));
            const volume = x / 234;
            setVolume(volume);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});