# 🎬 Favorite Movies & TV Shows API

A simple RESTful backend service that lets users manage their favorite movies and TV shows.
Built with **Node.js**, **TypeScript**, **Express**, **Prisma** and **PostgreSQL**.

---

## 🧩 Features

* Create, read (with pagination), update and delete favorite entries
* Optional search by title
* Input validation with **Zod**
* Layered architecture (controllers, services, routes)
* Type-safe database access with **Prisma**

---

## 🗂 Folder structure

```
favorite-movies-api/
├── src/
│   ├── config/          # DB connection, env loader
│   ├── controllers/     # Express request handlers
│   ├── routes/          # Route definitions (express.Router)
│   ├── services/        # Business logic and DB calls
│   ├── prisma/          # prisma schema & seed script
│   ├── middlewares/     # validation, error handling
│   ├── utils/           # helpers (pagination, constants)
│   ├── app.ts           # express app init
│   └── server.ts        # server bootstrap
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

> Note: keep file/folder names lowercase and plural where possible (e.g. `controllers`, `services`).

---

## ⚙️ Setup (local development)

1. Clone the repo

```bash
git clone https://github.com/<your-username>/favorite-movies-api.git
cd favorite-movies-api
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` in project root

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/moviesdb?schema=public"
PORT=5000
```

4. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. (Optional) Seed database

```bash
npx prisma db seed
```

6. Start dev server

```bash
npm run dev
```

Server will be available at `http://localhost:5000` (or the `PORT` you set).

---

## 📦 Scripts (package.json)

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node ./dist/server.js",
    "prisma:studio": "prisma studio"
  }
}
```

---

## 🧾 API Endpoints

Base path: `/api/entries`

### Create entry

`POST /api/entries`

Body (JSON):

```json
{
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": 160000000,
  "location": "Los Angeles",
  "duration": 148,
  "yearTime": "2010-07-16"
}
```

### List entries (pagination)

`GET /api/entries?page=1&limit=10`

Response shape:

```json
{
  "page": 1,
  "limit": 10,
  "total": 42,
  "data": [ /* entries */ ]
}
```

### Update entry

`PUT /api/entries/:id`

Body (JSON): partial fields allowed

### Delete entry

`DELETE /api/entries/:id`

### Search (bonus)

`GET /api/entries/search?title=Inception`

---

## ✅ Validation (Zod)

Example creation schema (all required on create):

```ts
import { z } from 'zod';

export const createEntrySchema = z.object({
  title: z.string().min(1),
  type: z.enum(['Movie', 'TV Show']),
  director: z.string().min(1),
  budget: z.number().positive(),
  location: z.string().min(1),
  duration: z.number().positive(),
  yearTime: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
    message: 'Invalid date',
  }),
});
```

Use a middleware to `schema.parse(req.body)` and return `400` on error.

---

## 📁 Sample Prisma schema (`prisma/schema.prisma`)

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

## 🧩 Example controller + service (short)

**controllers/entries.controller.ts**

```ts
import { Request, Response } from 'express';
import * as EntryService from '../services/entries.service';

export const create = async (req: Request, res: Response) => {
  const entry = await EntryService.createEntry(req.body);
  return res.status(201).json({ message: 'Entry created', data: entry });
};

export const list = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await EntryService.listEntries({ page, limit });
  return res.json(result);
};
```

**services/entries.service.ts**

```ts
import prisma from '../config/prismaClient';

export const createEntry = (data: any) => prisma.entry.create({ data });

export const listEntries = async ({ page, limit }: { page:number, limit:number }) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.entry.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.entry.count(),
  ]);
  return { page, limit, total, data };
};
```

---

## 🔁 Pagination helper (utils/pagination.ts)

```ts
export const parsePagination = (page?: string, limit?: string) => {
  const p = Math.max(Number(page) || 1, 1);
  const l = Math.min(Math.max(Number(limit) || 10, 1), 100);
  return { page: p, limit: l, skip: (p - 1) * l };
};
```

---

## 🔐 Security & best practices

* Never commit `.env` to git. Add it to `.gitignore`.
* Validate and sanitize inputs.
* Use parameterized queries (Prisma already handles this).
* Add rate-limiting and authentication for production.

---

## 🧪 Postman collection & demo

* Add your Postman collection JSON to `docs/postman_collection.json` if you want to share it.
* Optional: deploy to Render/Railway and add a Live Demo link here.

---

## 👨‍💻 Contributing

PRs welcome — please open issues for bugs or feature requests.

---

## 📄 License

MIT

---

## ✍️ Author

Your Name — add your GitHub and LinkedIn links
