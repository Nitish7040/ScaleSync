# ScaleSync

A modern, production-ready **3-tier task management application** built with React, Node.js, and MongoDB. Designed with a warm, minimal UI and containerized for seamless deployment.

---

## Screenshots

### Empty State
![Empty State](./screenshots/empty-state.png)

### Active Tasks
![Active Tasks](./screenshots/active-tasks.png)

### Task Progress
![Task Progress](./screenshots/task-progress.png)

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| **Frontend** | React 18, Vite 5, Axios            |
| **Backend**  | Node.js, Express 4, Mongoose       |
| **Database** | MongoDB                            |
| **Serving**  | Nginx (production)                  |
| **Containers** | Docker (Alpine-based images)     |

---

## Architecture

```
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│    Frontend     │      │    Backend      │      │    MongoDB      │
│  React + Vite   │─────▶│  Express API    │─────▶│   Database      │
│  Nginx (prod)   │ HTTP │  Port 3500      │      │   Port 27017    │
│  Port 80        │      │                 │      │                 │
└────────────────┘      └────────────────┘      └────────────────┘
```

---

## Features

- **Create, Read, Update, Delete** tasks via REST API
- **Mark tasks complete/incomplete** with visual feedback
- **Real-time progress tracking** — percentage bar, open/done counters
- **Time-based greeting** — Good morning / afternoon / evening
- **Animated UI** — fade-in transitions, hover effects
- **Empty state illustration** when no tasks exist
- **Responsive design** — works on mobile, tablet, and desktop
- **Production-ready Dockerfiles** with multi-stage builds and Alpine images

---

## Project Structure

```
ScaleSync/
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main UI component
│   │   ├── Tasks.jsx          # CRUD logic (base class)
│   │   ├── App.css            # Component styles
│   │   ├── index.css          # Global styles
│   │   ├── main.jsx           # React entry point
│   │   └── services/
│   │       └── taskServices.js  # Axios API client
│   ├── index.html             # Vite entry HTML
│   ├── vite.config.js         # Vite configuration
│   ├── Dockerfile             # Multi-stage: build → nginx
│   └── package.json
├── backend/
│   ├── index.js               # Express server entry
│   ├── db.js                  # MongoDB connection
│   ├── models/
│   │   └── task.js            # Mongoose task schema
│   ├── routes/
│   │   └── tasks.js           # CRUD route handlers
│   ├── Dockerfile             # Node.js Alpine image
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** (local or Atlas)
- **Docker** (optional, for containerized deployment)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ScaleSync.git
cd ScaleSync
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create environment variables or export them:

```bash
export MONGO_CONN_STR="mongodb://localhost:27017/scalesync"
export PORT=3500
```

Start the server:

```bash
node index.js
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_BACKEND_URL=http://localhost:3500/api/tasks
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Docker Deployment

### Build & run individually

**Backend:**

```bash
cd backend
docker build -t scalesync-backend .
docker run -d -p 3500:3500 \
  -e MONGO_CONN_STR="mongodb://host.docker.internal:27017/scalesync" \
  scalesync-backend
```

**Frontend:**

```bash
cd frontend
docker build -t scalesync-frontend .
docker run -d -p 80:80 scalesync-frontend
```

---

## API Endpoints

| Method   | Endpoint          | Description            |
|----------|-------------------|------------------------|
| `GET`    | `/api/tasks`      | Fetch all tasks        |
| `POST`   | `/api/tasks`      | Create a new task      |
| `PUT`    | `/api/tasks/:id`  | Toggle task completion |
| `DELETE` | `/api/tasks/:id`  | Delete a task          |
| `GET`    | `/ok`             | Health check           |

---

## Environment Variables

| Variable           | Service   | Description                     | Default |
|--------------------|-----------|---------------------------------|---------|
| `MONGO_CONN_STR`   | Backend   | MongoDB connection string       | —       |
| `PORT`             | Backend   | Server port                     | `3500`  |
| `USE_DB_AUTH`       | Backend   | Enable MongoDB auth             | `false` |
| `MONGO_USERNAME`    | Backend   | MongoDB username (if auth)      | —       |
| `MONGO_PASSWORD`    | Backend   | MongoDB password (if auth)      | —       |
| `VITE_BACKEND_URL`  | Frontend  | Backend API URL                 | —       |

---

## Color Palette

The UI uses a custom **"Warm Earth & Midnight"** palette:

| Color          | Hex       | Usage            |
|----------------|-----------|------------------|
| Midnight Ink   | `#1B2A3D` | Header, primary  |
| Burnt Copper   | `#C4693D` | Accent, buttons  |
| Olive Sage     | `#6B8F5E` | Success, checked |
| Parchment Cream| `#FDFAF5` | Card surfaces    |
| Linen          | `#F4F0EA` | Background       |
| Espresso       | `#2D2926` | Text             |
| Muted Brick    | `#B85450` | Delete, danger   |

---

## Author

**Nitish**

---

## License

This project is open source and available under the [MIT License](LICENSE).
