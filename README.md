# Hunger Free ERP

Hunger Free ERP is a unified system designed to manage food donations, NGO needs, inventories, volunteer tasks, and rewards to reduce food wastage.

The project is structured as two independent sub-projects: a React + Vite frontend and a Node.js + Apollo GraphQL backend.

---

## 🚀 Getting Started

To run the application, you will need to open separate terminal windows for the frontend and the backend.

### 1. Run the Backend (GraphQL Server)
Navigate to the `backend` directory, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run dev
```
- **GraphQL Server endpoint:** `http://localhost:4000/`
- **Auto-restart:** The server will automatically watch for changes in the `backend/src` directory and restart upon file updates.

### 2. Run the Frontend (React + Vite)
Navigate to the `frontend` directory, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
- **Local Application URL:** `http://localhost:5173/`

---

## 📂 Project Structure

- `frontend/` - React frontend with Vite, TailwindCSS, and Apollo Client.
- `backend/` - Node.js backend using Apollo Server, Mongoose, and GraphQL.
- `backend_legacy/` - Legacy backend written in Python (Django & Django REST Framework).

---

## 🐍 Legacy Backend (`backend_legacy`)
The `backend_legacy` directory contains the legacy implementation of the backend. 
- **Tech Stack:** Python 3, Django, Django REST Framework, Simple JWT, and MongoDB (`django-mongodb-backend`).
- **Purpose:** It serves as a historical reference/repository for the original Python-based endpoints and models before the migration to the new Node.js + GraphQL server in the `backend/` directory. It is not required to run the current application.
