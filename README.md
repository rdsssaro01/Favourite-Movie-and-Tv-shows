# 🎬 Favorite Movies & TV Shows API

A simple RESTful backend service that lets users manage their favorite movies and TV shows.
Built with **Node.js**, **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**.

---

## 🧩 Features

* Create, read (with pagination), update, and delete favorite entries
* Optional search by title
* Input validation with **Zod**
* Type-safe database access using **Prisma**
* Deployable on **Render** (free tier)

---

## 🗂 Folder Structure

```
favorite-movies-api/
├── src/
│   ├── config/              # Database connection, environment setup
│   ├── middlewares/         # Validation, error handling
│   ├── modules/             # Feature-based structure
│   │   └── entries/         # Entries module (movies & TV shows)
│   │       ├── entries.controller.ts
│   │       ├── entries.service.ts
│   │       ├── entries.repository.ts
│   │       └── entries.routes.ts
│   ├── utils/               # Helper functions (pagination, constants, etc.)
│   ├── app.ts               # Express app initialization
│   └── server.ts            # Server bootstrap file
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/favorite-movies-api.git
cd favorite-movies-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/moviesdb?schema=public"
PORT=5000
```

### 4️⃣ Initialize Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

Server will start on: `http://localhost:5000`

---

## 📦 Scripts (package.json)

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:migrate": "prisma migrate dev --name init",
    "prisma:generate": "prisma generate",
    "prisma:studio": "prisma studio"
  }
}
```

---

## 🧾 API Endpoints

### ➕ Add New Entry

`POST /api/entries`

### 📃 List Entries

`GET /api/entries?page=1&limit=10`

### ✏️ Edit Entry

`PUT /api/entries/:id`

### ❌ Delete Entry

`DELETE /api/entries/:id`

### 🔍 Search by Title

`GET /api/entries/search?title=Inception`

---

## 🧱 Prisma Schema Example

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Entry {
  id        Int      @id @default(autoincrement())
  title     String
  type      String
  director  String
  budget    Int
  location  String
  duration  Int
  yearTime  DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🧰 TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

---

## 🚀 Deploying to Render

### 1️⃣ Push Code to GitHub

Commit all files and push to a GitHub repository.

### 2️⃣ Create a New Web Service on Render

* Visit [Render.com](https://render.com)
* Click **New + → Web Service**
* Connect your GitHub repo

### 3️⃣ Configure Build and Start Commands

* **Environment:** Node
* **Build Command:** `npm run build && npx prisma generate`
* **Start Command:** `npm start`
* **Environment Variables:** Add your `DATABASE_URL` and `PORT`

### 4️⃣ Deploy

Render will automatically build and deploy your app.

### 5️⃣ View Logs

You can monitor deployment logs directly in Render’s dashboard.

---

## 🔒 Best Practices

* Do not commit `.env` files.
* Use Zod for request validation.
* Use `npm run build` before deployment.

---

##LiveDemo --  https://favourite-movie-and-tv-shows.onrender.com

## 👨‍💻 Author

Saravanan R
