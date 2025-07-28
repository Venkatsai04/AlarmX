# 🔔 AlarmX – Smart Alarm Web App

**AlarmX** is a smart alarm clock built with **React**, featuring real-time alarm management, customizable notes, repeat schedules, and audio playback. A clean and responsive UI powered by **Tailwind CSS**, with a vision to integrate **AI-powered sleepy face detection** in the future.

---

## 🌟 Features

- 🕒 Real-time digital clock
- ⏰ Add multiple alarms with:
  - Custom time and notes
  - Repeat on selected weekdays
  - On/Off toggle
- 🔊 Alarm audio playback
- 📱 Mobile responsive UI
- 🛑 Modal popup to stop ringing alarm
- 🎯 Accurate alarm trigger mechanism
- 💡 Extensible architecture for future AI features

---

## 📸 AI Integration

🚀 **Sleepy Face Detection with AI (Planned)**  
We are working on integrating an **AI-based facial detection module** that can identify a sleepy face via webcam and trigger an alarm dynamically. This will help users avoid oversleeping or dozing off during work/study sessions.

Technologies to be used:
- TensorFlow.js or MediaPipe (face landmarks)
- On-device ML using WebCam
- Alarm trigger on closed or drowsy eyes
- Optional alert sound or notification

---

## 🛠️ Tech Stack

| Tech             | Purpose                     |
|------------------|-----------------------------|
| React            | Frontend framework          |
| Tailwind CSS     | Styling and layout          |
| JavaScript (ES6) | Functional logic            |
| HTML5 Audio API  | Alarm sound playback        |
| useState, useRef, useEffect | React state management |

---

## 📂 Project Structure

┣ 📄 App.jsx # Main component
┣ 📄 index.js # Entry point
┣ 📄 alarm.wav # Alarm sound (in public folder)
┣ 📁 components # (Optional) reusable components
┗ 📄 styles.css # Tailwind CSS styles


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Venkatsai04/Alarmx.git
cd alarmx
```
### 2 .Install dependencies
```bash
npm install
```
### 3.Run the development server
```bash
npm run dev
```
### 4.Build for production
```bash
npm run build
```




🤝 Contributing
Pull requests are welcome! If you want to contribute, fork this repository and submit your changes via PR. For major updates, please open an issue first.


📄 License
MIT License – Feel free to use, fork, or contribute!


Let me know if you'd like me to also include GitHub badges, a banner image, or auto-deploy instructions (like Vercel or Netlify)!



