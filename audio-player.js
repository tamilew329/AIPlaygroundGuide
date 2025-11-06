// Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find all play buttons on the page
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        const audioId = button.id.replace('PlayBtn', 'Audio');
        const audioElement = document.getElementById(audioId);
        
        if (audioElement) {
            // Handle play/pause button click
            button.addEventListener('click', function() {
                if (audioElement.paused) {
                    // Pause all other audio elements
                    document.querySelectorAll('audio').forEach(audio => {
                        if (audio !== audioElement) {
                            audio.pause();
                            audio.currentTime = 0;
                        }
                    });
                    
                    // Reset all other play buttons
                    document.querySelectorAll('.play-btn').forEach(btn => {
                        if (btn !== button) {
                            btn.textContent = '▶';
                            btn.classList.remove('playing');
                        }
                    });
                    
                    // Play the audio
                    audioElement.play();
                    button.textContent = '⏸';
                    button.classList.add('playing');
                } else {
                    // Pause the audio
                    audioElement.pause();
                    button.textContent = '▶';
                    button.classList.remove('playing');
                }
            });
            
            // Reset button when audio ends
            audioElement.addEventListener('ended', function() {
                button.textContent = '▶';
                button.classList.remove('playing');
            });
            
            // Handle errors gracefully (audio files may not exist)
            audioElement.addEventListener('error', function() {
                console.log('Audio file not found. This is expected in demo mode.');
                // Show a message to the user
                button.disabled = false;
                button.style.opacity = '0.6';
                button.title = 'Audio file not available in demo mode';
            });
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Space bar to play/pause
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const activePlayButton = document.querySelector('.play-btn.playing') || document.querySelector('.play-btn');
            if (activePlayButton) {
                activePlayButton.click();
            }
        }
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add page transition effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Utility function to format time (for future use with real audio)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
