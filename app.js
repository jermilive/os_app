// app.js

// ─── Clock Updater ────────────────────────────────────────

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const clock = document.querySelector('.tray-item.clock');
    if (clock) clock.textContent = time;
}

updateClock();
setInterval(updateClock, 1000);   // every second



// ─── Start Menu Toggle ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const startMenu = document.getElementById('startMenu');

    if (!startBtn || !startMenu) return;

    function toggleStartMenu() {
        const isVisible = startMenu.classList.contains('visible');

        if (isVisible) {
            startMenu.classList.remove('visible');
            startBtn.classList.remove('active');
        } else {
            startMenu.classList.add('visible');
            startBtn.classList.add('active');
        }
    }

    // Click on Start button toggles menu
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();           // Prevent closing immediately
        toggleStartMenu();
    });

    // Click anywhere else → close menu
    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
            startMenu.classList.remove('visible');
            startBtn.classList.remove('active');
        }
    });

    // Optional: Press Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && startMenu.classList.contains('visible')) {
            startMenu.classList.remove('visible');
            startBtn.classList.remove('active');
        }
    });
});