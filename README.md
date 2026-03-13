# Task Manager

A mobile + web task management app. Built with Expo React Native on the frontend and Node.js + Express + MongoDB on the backend.

## Stack

- **Frontend** — Expo React Native (iOS, Android, Web)
- **Backend** — Node.js, Express, TypeScript
- **Database** — MongoDB Atlas
- **Auth** — JWT

## Getting started

### Backend

```bash
cd backend
pnpm install
pnpm dev
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

Server runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
pnpm install
pnpm start
```

Then press `a` for Android, `i` for iOS, or `w` for web.

If the backend is on a different machine, update `API_BASE_URL` in `frontend/constants/config.ts`.

## Features

- Register / login with JWT auth
- Create, edit, delete tasks
- Filter by status — Pending, In Progress, Completed
- Search tasks
- Progress stats dashboard
- Dark / light theme

## API

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

All task routes require `Authorization: Bearer <token>` header.
