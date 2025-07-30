# Wellness Session Manager 

A full-stack web app to create, publish, and manage wellness sessions like meditation, yoga, etc.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB (via MongoDB Atlas)
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** 
  - Frontend: Vercel 
  - Backend: Render


## Features

- Register/login users
- Create wellness sessions
- Save as draft or publish with a JSON file link
- Token-based authentication

## Live Demo

- Frontend: [wellness-session-app.vercel.app](https://wellness-session-app.vercel.app)
- Backend: [wellness-session-backend.onrender.com](https://wellness-session-backend.onrender.com)

> Example endpoint: [`/sessions`](https://wellness-session-backend.onrender.com/sessions)

## Folder Structure

- `/client` — React frontend
- `/server` — Node + Express + MongoDB backend

## Setup Instructions

1. Clone the repo  
   `git clone https://github.com/salomi-samuel/wellness-session-app.git`

2. Create `.env` file in backend:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ```


3. Install & run backend:
   ```bash
   cd server
   npm install
   npm start
   ```

4. Install & run frontend:
   ```bash
   cd client
   npm install
   npm start
   ```

## API Endpoints
- POST	    /register	Register new user
- POST	    /login	Login + get JWT token
- GET	      /sessions	View all sessions
- POST	    /sessions	Create session
- PUT	      /sessions/:id	Edit session



