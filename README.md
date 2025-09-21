# Camera-Automated Pomodoro Focus Timer

![App Screenshot](https://i.imgur.com/your-screenshot-url.png)
> **Note:** Replace the link above with a URL to your own screenshot! A great way to get a URL is to upload your screenshot to a site like [Imgur](https://imgur.com/). An animated GIF would be even better!

A modern, intelligent Pomodoro timer built with web technologies. This app uses your camera and browser-based AI to automatically pause your focus session when you step away from your desk, ensuring every minute tracked is a minute of true focus.

### [View Live Demo](https://your-netlify-app-url.netlify.app/)
> **Note:** Replace this with the public URL you got from Netlify!

---

## ✨ Key Features

This project is a feature-rich productivity tool that goes beyond a simple timer:

*   **🧠 Intelligent Camera Automation:** Uses `face-api.js` to detect your presence. The timer automatically pauses when you leave the frame and can resume when you return.
*   **🎨 Modern Glassmorphism UI:** A sleek, beautiful user interface with a blurred background effect and rounded elements.
*   ** animated Progress Ring:** A satisfying visual indicator of the time remaining in your session.
*   **✅ Task Management:** A dedicated input field to specify your goal for each Pomodoro session, which is then saved in your log.
*   **📊 Session Logging & Statistics:** Every completed focus session is saved to your browser's `localStorage`. You can view your entire productivity history in a clean, scrollable modal.
*   **🔔 Custom Notifications:** Unobtrusive, custom-styled notifications for the end of work and break sessions, replacing jarring browser alerts.
*   **🔄 Persistent State:** Accidentally closed the tab? No problem. The timer's state is saved, allowing you to refresh the page and resume exactly where you left off.
*   **📝 Dynamic Tab Title:** The browser tab updates dynamically to show the current time remaining, so you can always see the status at a glance while working in other tabs.
*   **⌨️ Keyboard Shortcuts:** Control the timer with ease (`S` to Start, `R` to Reset, `Spacebar` to Pause/Resume).
*   **🎵 Custom Sounds:** Pleasant audio cues for the end of work and break periods.

---

## 🚀 Tech Stack

This project was built entirely with modern front-end web technologies, running directly in the browser.

*   **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
*   **Face Detection:** [face-api.js](https://github.com/justadudewhohacks/face-api.js) (a powerful library running TensorFlow.js in the background)
*   **Deployment:** Hosted on Netlify

---

## 🔧 Setup and Local Development

To get this project running on your own machine, follow these steps.

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

**2. Ensure Assets are in Place**
The project requires the following files in the `/assets` directory:
*   `background.jpg`
*   `favicon.png`
*   `work_end.wav`
*   `break_end.wav`

The face detection models must be present in the `/models` directory.

**3. Run a Local Server**
You **must** serve the files from a local server. You cannot just open `index.html` in the browser, as browser security policies will block access to the camera (`getUserMedia`) from the `file://` protocol.

The easiest way is to use Python's built-in server. From the root of the project folder (`Pomo_web_app_new`), run:
```bash
python3 -m http.server
```
*(If you have an older Python version, you may need `python -m SimpleHTTPServer`)*

**4. Access the App**
Open your web browser and navigate to:
[http://localhost:8000](http://localhost:8000)

The browser will ask for permission to use your camera. You must grant it for the face detection to work.

---

## 📁 Project Structure

The code is organized into logical modules for better readability and maintenance.

```
/Pomo_web_app_new
|
|-- index.html         # The main HTML structure
|-- style.css          # All styles for the application
|
|-- /js                # Contains all JavaScript modules
|   |-- main.js        # Main entry point, orchestrates other modules
|   |-- dom.js         # Centralized DOM element references
|   |-- ui.js          # Handles all UI updates
|   |-- timer.js       # Core timer and countdown logic
|   |-- camera.js      # Face detection and camera management
|   |-- state.js       # Manages saving/loading state to localStorage
|   |-- notifications.js # Controls custom notifications
|
|-- /assets            # All static assets (images, sounds)
|
|-- /models            # Pre-trained face-api.js models
```

---

## 💡 Future Improvements

*   **User Accounts:** Implement a backend service (like Firebase) to allow users to sign in and sync their session history across devices.
*   **Advanced Statistics:** Create a dedicated stats page with charts and graphs to visualize productivity over time.
*   **Customizable Themes & Sounds:** Allow users to choose their own background images and notification sounds.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

*   A big thank you to the creator of [face-api.js](https://github.com/justadudewhohacks/face-api.js) for making browser-based face detection so accessible.
