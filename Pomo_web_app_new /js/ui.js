import { dom } from './dom.js'; // <-- UPDATED

let radius, circumference;

export function initializeUI() {
    const ring = dom.progressRingIndicator;
    radius = ring.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;
}

export function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    dom.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function updateTabTitle(time, message) {
    document.title = `${time} - ${message}`;
}

export function updateProgressRing(percentage) {
    const offset = circumference - (percentage / 100) * circumference;
    dom.progressRingIndicator.style.strokeDashoffset = offset;
}

export function setRingColor(isBreak) {
    dom.progressRingIndicator.style.stroke = isBreak ? 'var(--accent-blue)' : 'var(--accent-green)';
}

export function updateButtonStates(isRunning, isPaused) {
    dom.startBtn.disabled = isRunning;
    dom.pauseBtn.disabled = !isRunning;
    dom.resetBtn.disabled = !isRunning && dom.timerDisplay.textContent !== "25:00"; // Simple check
    dom.pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

export function updateCameraStatus(text, color) {
    dom.statusText.textContent = text;
    dom.statusText.style.backgroundColor = color;
}

export function toggleStatsModal() {
    if (dom.statsModal.style.display === 'block') {
        dom.statsModal.style.display = 'none';
    } else {
        renderStats();
        dom.statsModal.style.display = 'block';
    }
}

function renderStats() {
    const log = JSON.parse(localStorage.getItem('pomodoroLog')) || [];
    const content = dom.statsContent;
    if (log.length === 0) {
        content.innerHTML = '<p>No completed sessions yet. Get to work!</p>';
        return;
    }
    const list = log.map(item => `
        <li>
            <strong>${new Date(item.timestamp).toLocaleString()}:</strong> 
            <span>${item.task || '<em>No task specified</em>'} (${item.duration} min)</span>
        </li>
    `).join('');
    content.innerHTML = `<ul>${list}</ul>`;
}