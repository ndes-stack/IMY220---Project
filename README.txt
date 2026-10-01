========================================================================
IMY 220 Project 2026 - Deliverable 2: Photo Sharing Website (FORKFUL)
Student Name: N'des Junior Lunwgangu
Student Number: u25069366
========================================================================

GitHub Repository Link:
https://github.com/ndes-stack/IMY220---Project

------------------------------------------------------------------------
WHAT'S NEW IN DELIVERABLE 2
------------------------------------------------------------------------
- Real Express + MongoDB backend (native "mongodb" driver, no mongoose)
  with full CRUD for users, posts, albums, friendships, comments and
  reports.
- Frontend is fully wired to the backend using the native Fetch API -
  no more dummy data, no more hardcoded tokens.
- User accounts: sign up, log in, log out, edit your own profile.
- Social features: view other users, send/accept friend requests,
  unfriend, local ("friends") feed vs global feed.
- Posts: create (image + description + hashtags), edit, delete
  (creator only), like, comment, report.
- Albums: create, edit, delete (owner only), add/remove posts.
- Tailwind CSS v4 (via the official @tailwindcss/vite plugin) for a
  custom warm "Forkful" theme (Fraunces + Work Sans fonts, orange/cream
  palette) applied across every page and component - no default
  Tailwind/Bootstrap look.

------------------------------------------------------------------------
MONGODB SETUP (self-hosted via Docker Compose)
------------------------------------------------------------------------
This project does not require a MongoDB Atlas account. docker-compose.yml
includes a "mongo" service (official mongo:7 image) with a named volume
for persistence, exposed on the standard port 27017. The backend
container connects to it using the MONGODB_URI environment variable:

  MONGODB_URI=mongodb://mongo:27017/forkful

If you would rather use MongoDB Atlas instead, just change MONGODB_URI
in docker-compose.yml (or in a backend/.env file for local runs) to
your Atlas connection string - no code changes are required.

SEEDING THE DATABASE
The backend automatically runs backend/seed.js once on container start
(see backend/Dockerfile). It is idempotent - it only inserts data when
the "users" collection is empty - so it's safe on every restart. It
creates:
  - 2 users: pasta_maestro (Marco Rossi) and ramen_sensei (Kenji Sato)
    Demo login password for both: password123
  - 2 posts (one per user)
  - 1 album ("Marco's Pasta Classics") owned by pasta_maestro
  - 1 accepted friendship between pasta_maestro and ramen_sensei

To re-seed manually at any time:
  docker compose exec backend node seed.js
or, running locally:
  cd backend && npm run seed

------------------------------------------------------------------------
DOCKER BUILD & RUN INSTRUCTIONS
------------------------------------------------------------------------

METHOD 1: Docker Compose (Recommended - Single Command)
-------------------------------------------------------
To build and run mongo, backend and frontend together:
  docker compose up --build

To run in the background (detached mode):
  docker compose up -d --build

To stop the containers:
  docker compose down

To stop the containers AND wipe the Mongo data volume:
  docker compose down -v


METHOD 2: Individual Docker Containers
-------------------------------------------------------
1. Mongo:
     docker run -d -p 27017:27017 --name forkful-mongo -v forkful-mongo-data:/data/db mongo:7

2. Backend:
     docker build -t forkful-backend ./backend
     docker run -d -p 5000:5000 --name forkful-backend-container \
       -e MONGODB_URI=mongodb://host.docker.internal:27017/forkful \
       forkful-backend

3. Frontend:
     docker build -t forkful-frontend ./frontend
     docker run -d -p 3000:80 --name forkful-frontend-container forkful-frontend


------------------------------------------------------------------------
ACCESSING THE APPLICATION
------------------------------------------------------------------------
- Frontend Application: http://localhost:3000 (or http://localhost:5173 when running locally via npm run dev)
- Backend API Server:   http://localhost:5000
- Key API groups:
  * /api/auth     - register, login, me, logout
  * /api/users    - view/edit profiles, search users
  * /api/posts    - CRUD, like, comment, report, ?scope=global|local feeds
  * /api/albums   - CRUD, add/remove posts
  * /api/friends  - request, accept, unfriend, pending requests


------------------------------------------------------------------------
LOCAL DEVELOPMENT (WITHOUT DOCKER)
------------------------------------------------------------------------
1. Mongo: have a local mongod running on 27017, or point MONGODB_URI
   at any reachable MongoDB instance (Atlas included).

2. Backend:
   cd backend
   npm install
   npm run seed     (optional, first time only)
   npm start

3. Frontend:
   cd frontend
   npm install
   npm run dev

------------------------------------------------------------------------
OTHER COMMANDS USED DURING DEVELOPMENT
------------------------------------------------------------------------
- npm install tailwindcss @tailwindcss/vite   (frontend, Tailwind setup)
- npm install mongodb bcryptjs jsonwebtoken dotenv   (backend)
- npm run build                                (frontend production build)
========================================================================
