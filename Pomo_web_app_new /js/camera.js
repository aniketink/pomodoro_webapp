import { state } from './state.js';
import { dom } from './dom.js'; // <-- UPDATED
import * as ui from './ui.js';
import * as timer from './timer.js';

export async function initCamera() {
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('models'),
        ]);
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        dom.video.srcObject = stream;
    } catch (err) {
        console.error("Camera/Model Error:", err);
        ui.updateCameraStatus("Camera Error", "red");
    }
}

export function startDetection() {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(dom.video, new faceapi.TinyFaceDetectorOptions());
        const personDetected = detections.length > 0;

        if (personDetected && !state.isPersonPresent) {
            handlePersonPresence(true);
        } else if (!personDetected && state.isPersonPresent) {
            handlePersonPresence(false);
        }
    }, 1500); // Check every 1.5 seconds
}

function handlePersonPresence(isPresent) {
    state.isPersonPresent = isPresent;
    if (isPresent) {
        ui.updateCameraStatus("FACE DETECTED", "rgba(0, 255, 0, 0.7)");
        if (state.isRunning && state.isPaused && state.autoPausedByCamera) {
            timer.resume();
            state.autoPausedByCamera = false;
        }
    } else {
        ui.updateCameraStatus("NO FACE DETECTED", "rgba(255, 0, 0, 0.7)");
        if (state.isRunning && !state.isPaused) {
            timer.pause(true); // Auto-pause
            state.autoPausedByCamera = true;
        }
    }
}