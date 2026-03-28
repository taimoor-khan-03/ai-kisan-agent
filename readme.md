# 🌾 AI Kisan Agent: Crop Advisory Multi-Agent System

**AI Kisan Agent** is a comprehensive, intelligent agricultural platform designed to empower farmers with real-time, data-driven insights. By combining specialized AI agents with localized data, it provides actionable advice on weather, crop diseases, and market trends, specifically tailored for the Pakistani agricultural landscape.

---

<p align="center">
  <img src="./frontend/public/readme-pic.jpg" alt="Farmers using technology" width="250" style="margin:10px;" />
  <img src="./frontend/public/2.jpg" alt="Plowing the field with oxen" width="250" style="margin:10px;" />
</p>

<p align="center">
  <img src="./frontend/public/33.jpg" alt="Harvesting wheat" width="250" style="margin:10px;" />
</p>

---

## 🚀 Core Features (The Multi-Agent System)

The project utilizes an **Orchestrator** that manages a parallel and sequential pipeline of specialized agents:

* **🌡️ Weather Agent:** Real-time atmospheric data via OpenWeatherMap API.
* **🦠 Disease Agent:** Custom-trained **MobileNetV2** model identifying 38 different diseases.
* **💰 Market Agent:**  tracking of the **Pakistan Price Database** for crops.
* **📋 Advisory Agent:** Final synthesis of all data points into a cohesive, explainable strategy.

---

## 🌟 Unique & Responsible AI Features

* **🗣️ Urdu Language Support:** Full translation using the **Helsinki-NLP** model.
* **🎤 Voice-First Interface:** Integrated Urdu speech recognition for better accessibility.
* **📊 Explainable AI:** Recommendations include confidence scores and "Why" logic.
* **🛡️ Responsible Design:** "Consult expert" disclaimers and zero autonomous high-risk decisions.
* **📱 Mobile Ready:** Fully responsive design for use directly in the field.
* **📄 PDF Reports:** Downloadable summaries for offline reference.

---

## 🏗️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router), TypeScript |
| **Styling** | Tailwind CSS |
| **AI Models** |  MobileNetV2 (Custom), Helsinki-NLP |
| **Infrastructure** | HuggingFace Inference API, Vercel |
| **External APIs** | OpenWeatherMap API |
| **Package Manager** | Yarn |

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ai-kisan-agent.git](https://github.com/taimoor-khan-03/ai-kisan-agent.git)
   cd ai-kisan-agent
