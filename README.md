Favorite Movies & TV Shows API
A RESTful backend built with Node.js, TypeScript, Prisma ORM, and PostgreSQL. This API allows users to manage a list of their favorite movies and TV shows with full CRUD functionality and proper data validation.

🚀 Quick Start
1. Clone the Repository
bash
git clone <your-repo-url>
cd <your-repo-folder>
2. Install Dependencies
bash
npm install
3. Configure Environment Variables
Copy the example environment file and configure your variables:

bash
cp .env.example .env
Edit .env and set your DATABASE_URL.
Example:

text
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb?schema=public"
If deploying on Render, Render will provide this variable.

4. Initialize TypeScript
If not pre-configured:

bash
npx tsc --init
5. Initialize Prisma
bash
npx prisma init
Edit prisma/schema.prisma to define your models. Example:

text
model Entry {
  id        Int      @id @default(autoincrement())
  title     String
  type      String   // "Movie" or "TV Show"
  director  String
  budget    Int
  location  String
  duration  Int
  year      Int
}
6. Migrate & Seed Database
Run database migration:

bash
npx prisma migrate dev --name init
To seed (if a script exists):

bash
npx prisma db seed
7. Start the Server
Development:

bash
npm run dev
Production:

bash
npm run build
npm start
📦 Scripts
Common scripts (package.json):

npm run dev: Run in development with reload

npm run build: Compile TypeScript

npm start: Start compiled server

prisma:generate: Generate Prisma client

prisma:migrate: Run migrations

🗃️ Database Schema & Migrations
Models defined in prisma/schema.prisma

Migration scripts auto-generated in prisma/migrations/

Update schema → run npx prisma migrate dev or for production: npx prisma migrate deploy

🧩 API Endpoints
Endpoint	Method	Description
/api/entries	POST	Add a new entry
/api/entries	GET	List entries (pagination)
/api/entries/:id	PUT	Edit entry
/api/entries/:id	DELETE	Delete entry
✅ Validation
All endpoints use schema validation (e.g., Zod/Yup/express-validator)

Required fields: title, type, director, budget, location, duration, year

🌐 Live Deployment: Render
1. Push to GitHub
bash
git add .
git commit -m "Initial commit"
git push origin main
2. Create PostgreSQL Database on Render
Go to your Render dashboard → "New" → "PostgreSQL"

Note the DATABASE_URL connection string

3. Create a Web Service on Render
"New" → "Web Service"

Connect your GitHub repo

Set environment variable: DATABASE_URL as given by Render

Build Command: npm install && npm run build && npx prisma generate

Start Command: npm start

4. Add Pre-Deploy Migration Command
In Render's settings:
"Pre-Deploy Command" → npx prisma migrate deploy

5. Deploy
Render will build, run migrations, and start your service.

On completion, your API will be live at the given URL.

📝 Sample Data
You should seed the DB with at least 2 movies and 2 TV shows. Example seed script is in prisma/seed.ts.

📖 Further Reading
Prisma TypeScript Quickstart

Node.js + Prisma + PostgreSQL Guide

Render Deployment Guide
