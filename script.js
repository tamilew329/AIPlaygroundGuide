// Navigation functionality
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        // Handle landing page (no -page suffix)
        if (pageId === 'landing') {
            document.getElementById('landing-page').classList.add('active');
            window.scrollTo(0, 0);
        }
    }
}

// Audio functionality
let currentAudio = null;
let currentAudioBtn = null;

function toggleAudio(audioId) {
    const audio = document.getElementById(audioId);
    const btn = event.target.closest('.audio-btn');
    
    // If there's a currently playing audio, stop it
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentAudioBtn) {
            currentAudioBtn.classList.remove('playing');
            const icon = currentAudioBtn.querySelector('.audio-icon');
            const text = currentAudioBtn.querySelector('.audio-text');
            if (icon) icon.textContent = '▶';
            if (text) text.textContent = 'Play Audio Guide';
        }
    }

    if (audio.paused) {
        // Play audio
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
            // If audio file doesn't exist, show a message
            alert('Audio file not available. Please add audio files to enable playback.');
        });
        btn.classList.add('playing');
        const icon = btn.querySelector('.audio-icon');
        const text = btn.querySelector('.audio-text');
        if (icon) icon.textContent = '⏸';
        if (text) text.textContent = 'Pause Audio Guide';
        currentAudio = audio;
        currentAudioBtn = btn;
    } else {
        // Pause audio
        audio.pause();
        btn.classList.remove('playing');
        const icon = btn.querySelector('.audio-icon');
        const text = btn.querySelector('.audio-text');
        if (icon) icon.textContent = '▶';
        if (text) text.textContent = 'Play Audio Guide';
        currentAudio = null;
        currentAudioBtn = null;
    }
}

// Handle audio ended event
document.addEventListener('DOMContentLoaded', function() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('ended', function() {
            const btn = document.querySelector(`button[onclick*="${audio.id}"]`);
            if (btn) {
                btn.classList.remove('playing');
                const icon = btn.querySelector('.audio-icon');
                const text = btn.querySelector('.audio-text');
                if (icon) icon.textContent = '▶';
                if (text) text.textContent = 'Play Audio Guide';
            }
            currentAudio = null;
            currentAudioBtn = null;
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key to go back
    if (event.key === 'Escape') {
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            const pageId = activePage.id;
            if (pageId === 'introduction-page') {
                navigateTo('landing');
            } else if (pageId.startsWith('section')) {
                navigateTo('index');
            } else if (pageId === 'index-page') {
                navigateTo('introduction');
            }
        }
    }
});

// Initialize - ensure landing page is shown on load
document.addEventListener('DOMContentLoaded', function() {
    navigateTo('landing');
});
