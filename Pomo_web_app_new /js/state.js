export const state = {
    timerInterval: null,
    remainingTime: 25 * 60,
    totalDuration: 25 * 60,
    isRunning: false,
    isPaused: false,
    isBreak: false,
    isPersonPresent: false,
    autoPausedByCamera: false,
    pomodorosCompleted: 0,
    currentTask: ""
};

export function saveState() {
    const stateToSave = {
        remainingTime: state.remainingTime,
        totalDuration: state.totalDuration,
        isRunning: state.isRunning,
        isPaused: state.isPaused,
        isBreak: state.isBreak,
        pomodorosCompleted: state.pomodorosCompleted,
        currentTask: document.getElementById('task-input').value,
    };
    localStorage.setItem('pomodoroState', JSON.stringify(stateToSave));
}

export function loadState() {
    const savedState = localStorage.getItem('pomodoroState');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Only restore if the timer was running
        if (parsedState.isRunning) {
            Object.assign(state, parsedState);
            document.getElementById('task-input').value = state.currentTask;
            return true; // Indicates a state was loaded
        }
    }
    return false; // No state was loaded
}

export function logSession(task, duration) {
    let log = JSON.parse(localStorage.getItem('pomodoroLog')) || [];
    log.unshift({ timestamp: new Date().toISOString(), duration, task });
    localStorage.setItem('pomodoroLog', JSON.stringify(log));
}