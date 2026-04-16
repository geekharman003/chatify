<img width="2658" height="1595" alt="chatify" src="https://github.com/user-attachments/assets/560f4aac-956d-4ee5-ad50-778552781fc7" />
# 💬 Chat App

A full-stack real-time chat application built with modern web technologies. This app allows users to sign up, log in, and exchange messages instantly with a clean and responsive interface.

---

## 🚀 Features

* 🔐 User Authentication (Signup / Login / Logout)
* 💬 Real-time Messaging
* 🟢 Online Users Indicator
* 📩 Send & Receive Messages Instantly
* 🧾 Chat Sidebar & Conversations
* 🖼️ Profile Update Support
* ⚡ Rate Limiting for Security
* 📧 Welcome Email (on signup)
* 🤖 Ai Auto Suggestions
* 📁 image sharing

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TailwindCSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Database)
* Socket.IO (Real-time communication)
* JWT Authentication

---

## 📁 Project Structure

```
chatify/
│
├── backend/        # Express server, APIs, database logic
├── frontend/       # React frontend application
├── package.json    # Root scripts
└── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/geekharman003/chatify.git
cd chatify
```

### 2. Install dependencies

```bash
npm run build
```

This will install dependencies for both:

* backend
* frontend

---

### 3. Environment Variables

Create a `.env` file inside the **backend** folder and add:

```env
NODE_ENV=development
PORT=3000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret

RESEND_API_KEY=your_resend_api_key

EMAIL_FROM=your_email
EMAIL_FROM_NAME=your_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

GEMINI_API_KEY=your_gemini_key

```
### 4. Run the app

```bash
cd backend
npm run start

cd frontend
npm run dev
```

* Backend runs on: `http://localhost:3000`
* Frontend runs on: `http://localhost:5173`

---

## 🔄 Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run build` | Install frontend & backend dependencies |

---

## 📸 Screenshots

* Signup Page
<img width="2578" height="1537" alt="singup-page" src="https://github.com/user-attachments/assets/d76cc54b-842c-4860-96dd-13708bf733b5" />

* Login Page
<img width="2557" height="1527" alt="login-page" src="https://github.com/user-attachments/assets/38581b4e-07db-4b33-871c-bbe3b2884faf" />

* Chat Interface
<img width="2658" height="1595" alt="chatify" src="https://github.com/user-attachments/assets/df7247ed-9408-4e22-8e2a-0582b75298b4" />

---

## 🔒 Security Features

* JWT-based authentication
* Password hashing
* Rate limiting to prevent abuse

---

# 📡 API Documentation

## 🔐 Auth endpoints

| Method | Endpoint       | Description       | Auth Required |
| ------ | -------------- | ----------------- | ------------- |
| POST   | `/auth/signup` | Register new user | ❌ No          |
| POST   | `/auth/login`  | Login user        | ❌ No          |
| POST   | `/auth/logout` | Logout user       | ✅ Yes         |
| PUT   | `/auth/update-profile` | Update user profile       | ✅ Yes         |

## 💬 Message Endpoints

| Method | Endpoint            | Description                | Auth Required |
| ------ | ------------------- | -------------------------- | ------------- |
| GET   | `/messages/contacts`         | Get all contacts             | ✅ Yes         |
| GET    | `/messages/chats` | Get all recent chats | ✅ Yes         |
| GET    | `/messages/:id` | Get all messages for single chat | ✅ Yes         |
| POST    | `/messages/send/:id` | Sends the message to a user | ✅ Yes         |
| POST    | `/messages/suggestions` | Generate message suggestions | ✅ Yes         |


---

## 🌐 Future Improvements

* 📎 File sharing
* 🧵 Group chats
* 🔔 Notifications
* ↗️ Scalability (caching, clustering, horizontal scaling)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Developed with ❤️ by 
[@geekharman003](https://github.com/geekharman003)

---
