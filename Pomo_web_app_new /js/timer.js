import { state, saveState, logSession } from './state.js';
import { dom } from './dom.js'; // <-- UPDATED
import * as ui from './ui.js';
import * as notifications from './notifications.js';

const sounds = {
    workEnd: new Audio('assets/work_end.wav'),
    breakEnd: new Audio('assets/break_end.wav')
};

export function start(durationMinutes, isBreakSession = false) {
    clearInterval(state.timerInterval);

    state.isRunning = true;
    state.isPaused = false;
    state.isBreak = isBreakSession;
    state.totalDuration = durationMinutes * 60;
    state.remainingTime = state.totalDuration;

    ui.setRingColor(state.isBreak);
    ui.updateTimerDisplay(state.remainingTime);
    ui.updateProgressRing(100);
    ui.updateButtonStates(state.isRunning, state.isPaused);
    document.getElementById('task-input').disabled = !isBreakSession;

    state.timerInterval = setInterval(() => {
        if (!state.isPaused) {
            state.remainingTime--;
            const percentage = (state.remainingTime / state.totalDuration) * 100;
            ui.updateTimerDisplay(state.remainingTime);
            ui.updateProgressRing(percentage);
            ui.updateTabTitle(dom.timerDisplay.textContent, state.isBreak ? "Break Time!" : "Focus!");
            saveState();

            if (state.remainingTime <= 0) {
                handleTimerEnd();
            }
        }
    }, 1000);
}

export function pause(isAutoPause = false) {
    state.isPaused = true;
    ui.updateButtonStates(state.isRunning, state.isPaused);
    if (isAutoPause) {
        dom.timerDisplay.style.color = 'orange';
    } else {
        dom.timerDisplay.style.color = 'var(--accent-yellow)';
    }
    saveState();
}

export function resume() {
    state.isPaused = false;
    ui.updateButtonStates(state.isRunning, state.isPaused);
    dom.timerDisplay.style.color = 'var(--text-color)';
    saveState();
}

export function reset() {
    clearInterval(state.timerInterval);
    state.isRunning = false;
    state.isPaused = false;
    state.isBreak = false;
    
    const workMinutes = parseInt(dom.workMinutesInput.value);
    state.remainingTime = workMinutes * 60;
    state.totalDuration = state.remainingTime;
    
    ui.updateTimerDisplay(state.remainingTime);
    ui.updateProgressRing(100);
    ui.updateButtonStates(state.isRunning, state.isPaused);
    ui.updateTabTitle("Pomodoro", "Ready to focus?");
    ui.setRingColor(false);
    document.getElementById('task-input').disabled = false;
    saveState();
}

function handleTimerEnd() {
    clearInterval(state.timerInterval);

    if (!state.isBreak) {
        state.pomodorosCompleted++;
        const task = dom.taskInput.value;
        const duration = state.totalDuration / 60;
        logSession(task, duration);
        sounds.workEnd.play();

        const rounds = parseInt(dom.roundsInput.value);
        if (state.pomodorosCompleted > 0 && state.pomodorosCompleted % rounds === 0) {
            notifications.show("Long break time!", 'success');
            start(parseInt(dom.longBreakInput.value), true);
        } else {
            notifications.show("Take a short break!", 'success');
            start(parseInt(dom.shortBreakInput.value), true);
        }
    } else {
        sounds.breakEnd.play();
        notifications.show("Break's over! Back to work.", 'info');
        start(parseInt(dom.workMinutesInput.value), false);
    }
}