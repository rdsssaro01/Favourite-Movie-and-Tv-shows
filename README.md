# 🎬 Favorite Movies & TV Shows API

A simple RESTful backend service that allows users to manage their favorite movies and TV shows.  
Built using **Node.js**, **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**.

---

## 🧩 Problem Statement

Build a RESTful API service that supports:

- Adding new favorite movies or TV shows.
- Viewing entries with pagination.
- Editing and deleting entries.
- Optional: Searching entries by title.

Each entry includes the following fields:
> `title`, `type` (Movie/TV Show), `director`, `budget`, `location`, `duration`, `yearTime`.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend Framework | Node.js + Express |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Zod |
| Dev Tooling | Nodemon, ts-node-dev |

---

## 🗂️ Folder Structure

📦 favorite-movies-api
├── 📁 src
│ ├── 📁 config # Database connection & environment setup
│ ├── 📁 controllers # Request handling logic
│ ├── 📁 routes # Express route definitions
│ ├── 📁 services # Business logic layer
│ ├── 📁 prisma # Prisma schema & migrations
│ ├── 📁 middlewares # Validation, error handling, etc.
│ ├── 📁 utils # Helpers (pagination, constants, etc.)
│ ├── app.ts # Express app initialization
│ └── server.ts # Server bootstrap file
├── .env # Environment variables
├── package.json
├── tsconfig.json
├── prisma/schema.prisma
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/favorite-movies-api.git
cd favorite-movies-api
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment
Create a .env file in the root directory:

env
Copy code
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/moviesdb?schema=public"
PORT=5000
4️⃣ Initialize Prisma
bash
Copy code
npx prisma generate
npx prisma migrate dev --name init
5️⃣ Seed Database (Optional)
bash
Copy code
npx prisma db seed
6️⃣ Run Server
bash
Copy code
npm run dev
Server will start on:
👉 http://localhost:5000

🧠 API Endpoints
➕ Add New Entry
POST /api/entries

Body:

json
Copy code
{
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": 160000000,
  "location": "Los Angeles",
  "duration": 148,
  "yearTime": "2010-07-16"
}
📃 List Entries (with Pagination)
GET /api/entries?page=1&limit=10

Response Example:

json
Copy code
{
  "page": 1,
  "limit": 10,
  "total": 4,
  "data": [
    { "id": 1, "title": "Inception", "type": "Movie", ... }
  ]
}
✏️ Edit Entry
PUT /api/entries/:id

Body:

json
Copy code
{
  "title": "Inception Updated",
  "duration": 150
}
❌ Delete Entry
DELETE /api/entries/:id

🔍 (Bonus) Search by Title
GET /api/entries/search?title=Inception

🧾 Validation Rules (Zod)
All fields required on creation.

type must be one of: Movie, TV Show.

budget, duration must be positive numbers.

yearTime must be a valid date.

📦 Sample Prisma Schema
prisma
Copy code
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
🧰 Scripts
Command	Description
npm run dev	Start development server
npm run build	Compile TypeScript
npm start	Run compiled server
npx prisma studio	Open Prisma DB viewer

🧪 Postman Collection
You can import the collection from this link:
👉 Postman Collection JSON

🌐 Live Demo
👉 Live Demo Link
(Optional if deployed to Render, Railway, or Vercel)

🧱 Evaluation Criteria
✅ Code Quality: Clear, maintainable TypeScript structure

✅ Functionality: All CRUD + pagination implemented

✅ Validation: Proper input validation using Zod

✅ Best Practices: Layered architecture, Prisma ORM usage

✅ Documentation: This README and API docs are clear

👨‍💻 Author
Your Name
GitHub • LinkedIn
