# 🌿 WildQuest AI — Less Scrolling, More Exploring

**An AI-powered nature exploration experience that encourages people to step away from their screens and discover the world around them.**

WildQuest AI transforms an ordinary outdoor walk into an interactive adventure. Upload a photo of something you discover in nature, explore an AI-generated image classification result, complete real-world nature quests, and earn XP as you build your own digital field journal.

Built with **HTML, CSS, JavaScript, and open-weight AI**, WildQuest AI explores how accessible AI can encourage meaningful offline experiences rather than more screen time.

## ✨ Overview

What if AI didn't keep us glued to our screens, but inspired us to look up, step outside, and reconnect with nature?

WildQuest AI is built around this idea. It combines browser-based AI image classification with outdoor challenges and a gamified progress system to make nature exploration more interactive, accessible, and fun.

🌱 **The mission:** Make the screen the starting point of an outdoor adventure, not the destination.

## 🚀 Features

### 🤖 AI Nature Explorer
- Upload a photo of a plant, flower, leaf, animal, or other natural object.
- Analyze images using a compatible pretrained image-classification model.
- View the model's top prediction and confidence score.
- Explore possible visual categories and investigate your discovery further.

### 🌿 Outdoor Quest System
Complete real-world challenges designed to encourage observation and curiosity.

Examples include:
- 🍃 **Leaf Detective:** Find three different leaf shapes.
- ☁️ **Sky Watcher:** Observe different cloud shapes and patterns.
- 🐦 **Nature Listener:** Listen for three different natural sounds.
- 🌱 **Tiny World Explorer:** Observe natural textures without disturbing wildlife.
- 🌼 **Color Collector:** Find five different colors in nature.
- 🚶 **Screen-Free Stroll:** Take a short walk in a safe, familiar place.

### 🏆 Gamified Progress
- Earn XP by saving discoveries and completing quests.
- Track completed missions.
- View your total XP and discovery count.
- Encourage consistent outdoor exploration through small achievements.

### 📔 Personal Nature Journal
- Save AI classification results as discoveries.
- View previously saved discoveries.
- Store progress locally in your browser using `localStorage`.

### 📱 Responsive Interface
- Nature-inspired forest-green and cream design.
- Responsive layouts for desktop and mobile screens.
- Simple navigation and accessible status messages.
- Lightweight frontend built without a traditional backend.

## 🧠 Open-Source AI at the Core

WildQuest AI uses **[Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js/index)** to run compatible machine-learning models directly in the browser.

### AI model

- **Model:** [Xenova/MobileNet V2](https://huggingface.co/Xenova/mobilenet_v2)
- **Task:** Image classification
- **Runtime:** Hugging Face Transformers.js
- **Inference:** Browser-based, using supported execution backends.

The model produces likely image categories and associated scores. These are predictions rather than verified species identifications.

### Why open innovation matters

Open AI gives developers the opportunity to inspect available models, experiment with different architectures, adapt their applications, and build experiences without depending entirely on a proprietary AI API.

For WildQuest AI, this approach offers several advantages:

- **Accessible experimentation:** Build an AI-powered experience without requiring a paid inference API key.
- **Browser-based inference:** Compatible models can run on the user's device instead of sending every image to a separate application server.
- **Greater control:** Developers can explore alternative models and runtimes as the project evolves.
- **Privacy potential:** Images can be processed locally when using the browser-based inference path, rather than uploading them to a developer-operated inference server.
- **Offline potential:** A future version can cache the required model and application assets to support offline exploration.

**Current limitation:** The initial implementation downloads its runtime and model from a CDN. Therefore, it is not fully offline out of the box. Offline support requires additional caching and testing.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and content |
| CSS3 | Responsive layout, styling, and visual design |
| JavaScript (ES Modules) | Application logic and interactivity |
| Hugging Face Transformers.js | Browser-based AI inference |
| MobileNet V2 | Pretrained image classification |
| Browser File API | Image uploads and previews |
| Local Storage API | Persistent quest and journal data |
| GitHub Pages | Static website hosting |

## 🏗️ Project Structure

```text
WildQuest-AI/
├── index.html     # Main application interface
├── style.css      # Responsive nature-inspired styling
├── script.js      # AI inference, quests, XP, and journal
└── README.md      # Project documentation
```

## ⚙️ Getting Started

### Prerequisites

- A modern web browser.
- An internet connection for the initial AI runtime and model download.
- A code editor such as Visual Studio Code.
- A local development server, such as the Live Server extension.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/WildQuest-AI.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Enter the project directory

```bash
cd WildQuest-AI
```

### 3. Start the application

Open the folder in Visual Studio Code.

Install the Live Server extension, right-click `index.html`, and choose **Open with Live Server**.

The application should open in your browser.

### 4. Try the AI explorer

1. Select a nature photograph from your device.
2. Click **Identify with AI**.
3. Wait for the model to load and analyze the image.
4. Review the predicted category and model score.
5. Save the discovery to your journal to earn XP.

### 5. Complete outdoor quests

Scroll to the outdoor missions section, choose a challenge, complete it in real life, and mark it as completed.

Your XP and saved progress will be stored in the browser.

## 🌍 Deployment on GitHub Pages

WildQuest AI can be hosted as a static website using GitHub Pages.

1. Create a repository on GitHub.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open the repository's **Settings**.
4. Select **Pages**.
5. Choose the deployment source and branch, typically `main` and `/(root)`.
6. Save the settings and wait for the deployment to finish.
7. Open the published website and test image classification and quest completion.

**Note:** The website can load while the AI model fails independently. Verify that the CDN is reachable and that the browser supports the selected model and runtime.

## 🔐 Privacy and Safety

WildQuest AI is designed with a lightweight, browser-first architecture.

- The current frontend does not include a custom application server or a feature that intentionally uploads selected photographs to a developer-operated backend.
- Browser-based model inference can process images locally.
- Quest progress and saved discoveries are stored in the browser's local storage.
- Local storage is not encrypted and may be cleared by the user or browser.
- The AI can produce inaccurate or misleading predictions.
- Never eat an unidentified plant, touch unfamiliar wildlife, or approach animals to obtain a photograph.
- Explore outdoors responsibly, respect private property, and leave natural habitats undisturbed.

Third-party runtime and model downloads still involve network requests. Review their respective documentation and privacy practices before making stronger privacy guarantees.

## ⚠️ Current Limitations

WildQuest AI is an early-stage prototype.

- MobileNet V2 is a general-purpose image classifier, not a specialist plant or bird identification system.
- The highest-scoring prediction may be incorrect.
- Model confidence scores are not guarantees of accuracy.
- The application needs an internet connection to download its dependencies and model on first use.
- Full offline inference is not implemented yet.
- Progress is stored per browser and is not synchronized across devices.
- XP is a motivational game mechanic, not proof that a quest was completed.
- The model and runtime must be compatible with the browser and device.

## 🔮 Future Improvements

Potential next steps include:

- [ ] Integrate a model specifically trained for plant, bird, or wildlife identification.
- [ ] Add top-three prediction cards with richer explanations.
- [ ] Add a dedicated bird-call identification feature.
- [ ] Implement a Progressive Web App (PWA) and test offline functionality.
- [ ] Cache model assets for supported offline use.
- [ ] Add a daily quest generator using an open-weight language model.
- [ ] Add optional location-aware suggestions with explicit user permission.
- [ ] Introduce badges, levels, streaks, and achievement milestones.
- [ ] Add nature observation notes and optional journal photographs.
- [ ] Improve accessibility and test across mobile devices.
- [ ] Add automated tests for quest rewards and persistent storage.

## 💚 Why Touch Grass?

Technology is powerful, but our relationship with it matters.

WildQuest AI explores a different use of AI: helping people become more curious about their surroundings and giving them small reasons to go outside.

Instead of optimizing for more time spent in an application, the project encourages users to discover something, complete a real-world activity, and return to their everyday lives.

**Open innovation makes this experiment easier to build, inspect, extend, and improve.**

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application locally.
5. Submit a pull request describing your contribution.

Ideas for improving image classification, offline support, accessibility, nature quests, and privacy are especially welcome.

## 📄 License

Choose a license for your project before distributing it. For example, you may select the MIT License for your own code if it fits your goals.

The project license does not automatically cover third-party AI models, libraries, fonts, or other assets. Review and comply with their individual licenses and attribution requirements.

## 🌿 Built for the Touch Grass Challenge

**WildQuest AI — Less scrolling. More exploring.**

Made with HTML, CSS, JavaScript, and open AI to help bring the digital world a little closer to the natural one.
