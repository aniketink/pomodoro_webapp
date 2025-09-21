import { dom } from './dom.js'; // <-- UPDATED

let timeoutId;

export function show(message, type = 'info', duration = 4000) {
    clearTimeout(timeoutId);

    const notification = dom.notification;
    notification.textContent = message;
    notification.className = 'notification'; // Reset classes
    notification.classList.add(type); // 'info' or 'success'
    notification.classList.add('show');

    timeoutId = setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}