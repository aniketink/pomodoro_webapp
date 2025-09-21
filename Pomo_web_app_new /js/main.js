import { state, loadState } from './state.js';
import { dom } from './dom.js'; // <-- UPDATED
import * as ui from './ui.js';
import * as timer from './timer.js';
import * as camera from './camera.js';

// --- Initialization ---
function initializeApp() {
    ui.initializeUI();
    
    if (loadState()) {
        ui.updateButtonStates(state.isRunning, state.isPaused);
        ui.updateTimerDisplay(state.remainingTime);
        const percentage = (state.remainingTime / state.totalDuration) * 100;
        ui.updateProgressRing(percentage);
        ui.setRingColor(state.isBreak);
        timer.start(state.totalDuration / 60, state.isBreak);
        if (state.isPaused) {
            timer.pause();
        }
    } else {
        timer.reset();
    }
    
    camera.initCamera();
}

// --- Event Listeners ---
dom.startBtn.addEventListener('click', () => {
    timer.start(parseInt(dom.workMinutesInput.value), false);
});

dom.pauseBtn.addEventListener('click', () => {
    state.isPaused ? timer.resume() : timer.pause();
});

dom.resetBtn.addEventListener('click', timer.reset);
dom.statsBtn.addEventListener('click', ui.toggleStatsModal);
dom.modalCloseBtn.addEventListener('click', ui.toggleStatsModal);
dom.statsModal.addEventListener('click', (e) => {
    if (e.target === dom.statsModal) ui.toggleStatsModal();
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') return;
    
    if (e.code === 'Space' && !dom.pauseBtn.disabled) {
        e.preventDefault();
        dom.pauseBtn.click();
    } else if (e.code === 'KeyS' && !dom.startBtn.disabled) {
        e.preventDefault();
        dom.startBtn.click();
    } else if (e.code === 'KeyR' && !dom.resetBtn.disabled) {
        e.preventDefault();
        dom.resetBtn.click();
    }
});

dom.video.addEventListener('play', camera.startDetection);

// --- App Startup ---
initializeApp();