========================================================================
IMY 220 Project 2026 - Deliverable 1: Photo Sharing Website (FORKFUL)
Student Name: N'des Junior Lunwgangu
Student Number: u25069366
========================================================================

GitHub Repository Link:
https://github.com/ndes-stack/IMY220---Project

------------------------------------------------------------------------
DOCKER BUILD & RUN INSTRUCTIONS
------------------------------------------------------------------------

METHOD 1: Docker Compose (Recommended - Single Command)
-------------------------------------------------------
To build and run both the frontend and backend containers together:
  docker compose up --build

To run in the background (detached mode):
  docker compose up -d --build

To stop the containers:
  docker compose down


METHOD 2: Individual Docker Containers
-------------------------------------------------------
1. Backend Container:
   Navigate to the backend directory or build from root:
     docker build -t forkful-backend ./backend
   Run the backend container:
     docker run -d -p 5000:5000 --name forkful-backend-container forkful-backend

2. Frontend Container:
   Navigate to the frontend directory or build from root:
     docker build -t forkful-frontend ./frontend
   Run the frontend container:
     docker run -d -p 3000:80 --name forkful-frontend-container forkful-frontend


------------------------------------------------------------------------
ACCESSING THE APPLICATION
------------------------------------------------------------------------
- Frontend Application: http://localhost:3000 (or http://localhost:5173 when running locally via npm run dev)
- Backend API Server:   http://localhost:5000
- Authentication Endpoints:
  * POST http://localhost:5000/api/auth/login
  * POST http://localhost:5000/api/auth/register
  * GET  http://localhost:5000/api/health


------------------------------------------------------------------------
LOCAL DEVELOPMENT (WITHOUT DOCKER)
------------------------------------------------------------------------
1. Backend:
   cd backend
   npm install
   npm start

2. Frontend:
   cd frontend
   npm install
   npm run dev
========================================================================
