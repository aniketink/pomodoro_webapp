// This file's only job is to find all the HTML elements and export them in one object.
export const dom = {
    video: document.getElementById('video'),
    statusText: document.getElementById('status-text'),
    timerDisplay: document.querySelector('.timer-display'),
    startBtn: document.getElementById('start-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    resetBtn: document.getElementById('reset-btn'),
    statsBtn: document.getElementById('stats-btn'),
    progressRingIndicator: document.querySelector('.progress-ring__indicator'),
    taskInput: document.getElementById('task-input'),
    workMinutesInput: document.getElementById('work-minutes'),
    shortBreakInput: document.getElementById('short-break-minutes'),
    longBreakInput: document.getElementById('long-break-minutes'),
    roundsInput: document.getElementById('rounds'),
    notification: document.getElementById('notification'),
    statsModal: document.getElementById('stats-modal'),
    statsContent: document.getElementById('stats-content'),
    modalCloseBtn: document.querySelector('.close-btn')
};