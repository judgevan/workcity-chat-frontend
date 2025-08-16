
---

# 2. ✅ Frontend (`workcity-chat-frontend/README.md`)

```markdown
# Workcity Chat Frontend

This is the **React frontend** for the Workcity Chat system.  
It provides signup/login, conversations, and real-time chat UI.

---

## 🚀 Features
- React + Axios API integration
- Login/Signup forms
- Inbox with conversation list
- Real-time chat using **Socket.IO client**
- Responsive UI (Tailwind)

---

## ⚙️ Requirements
- Node.js 18+

---

## 📂 Installation
1. Clone the repo:
   ```sh
   git clone https://github.com/judgevan/workcity-chat-frontend
   cd workcity-chat-frontend

2
Install dependencies:

npm install

3
Update src/api.js to point to your backend:

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export default api;

4
Run frontend:

npm start

5
Open browser:

http://localhost:3000

6
🛠️ Technologies

React

Axios

TailwindCSS

Socket.IO Client