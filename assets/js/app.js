document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    const audioPlayers = document.querySelectorAll('audio');
    audioPlayers.forEach(player => {
        player.addEventListener('play', () => {
            audioPlayers.forEach(other => {
                if (other !== player) {
                    other.pause();
                }
            });
        });
    });
});
