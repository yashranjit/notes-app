# Notes app Desgin 
This is my first full-stack project. I built it to understand how a frontend, backend, authentication system, and database all connect 
in one real application.

The app allows a user to:
- Register an account
- log in
- create notes
- view their own notes
- update notes
- delete notes

More than just building features, this project helped me learn how to structure code, protect user data, and move data from UI to 
database and back.

## Why I built this
I wanted my first project to be simple enough to finish, complete enough to teach me real full-stack development concepts. A notes app 
was good choice because it includes:

- user authentication
- CRUD operations
- database design
- frontend and backend communication
- protected routes

It feels like a small app, but it touched important software engineering ideas.

## Project Goal
The goal of this project was to build a clean and understandable notes application where each user can manage only their own notes. 
I split the project into two parts: 
- `frontend/` for the React UI
- `backend/` for the API, authentication, and database logic

## Tech stack 

### Frontend 
- React
- Vite
- TailwindCSS

### Backend 
- Node.js
- Express
- TypesScript
- Drizzle ORM
- PostgreSQL
- JWT for authentication
- Zod for validation
- bcrypt for password hashing

## How I desgined it
1. The frontend collects input from the users.
2. The frontend sends HTTP request to the backend API.
3. The backend validates the input.
4. The backend reads from or writes to the database.
5. The backend sends a JSON response back to the frontend.
6. The frontend updates the UI based on the response.

I kept the frontend and backend separate because it kept the responsibilites clear:

- Frontend is responsible for the UI
- Backend is responsible for business logic and security
- Database is responsible for storing users and notes

## How the app works (Work flow of the app) 

### 1. Authentication flow
When a user registers:

- the frontend sends name, email, password to the backend
- backend validates the input using zod schema
- the password is hashed before saving it using bcrypt
- the user then stored in database
- backend creates a JWT token
- token is returned to the frontend
- the frontend stores the token in the localStorage

When user logs in:

- backend checks whether email exists in database
- the password is compared using the bcrypt
- if valid, a JWT token is generated
- the frontend stores the token in localStorage

### 2. Protected Notes routes 
The notes routes are protected using authentication middleware

That middleware: 
- reads the token from the `Authorization` header
- verifies it using the JWT secret
- extracts the user id
- attaches the user id to the request

This is how backend is made aware of which user it should process the request for.

### 3. Notes flow

Once logged in, the user can perform CURD operations on notes:

- create a note
- fetch all notes
- delete a note
- fetch a single note
- update a note

Each note is linked to a specific user using userId. Before updating and deleting a note, backend checks whether the note belongs to the 
logged-in user. This prevents one user from changing another user's data.

## Database design
This project uses two main tables: 

<img width="614" height="360" alt="Screenshot 2026-04-22 at 11 37 29 AM" src="https://github.com/user-attachments/assets/3ef83b13-cb9a-474d-95b2-9d1ca91dddf6" />

The realtionship is: 
- one user can have many notes
- each note belongs to exactly one user
I used a foreign key - notes.userId to users.id so the data stays connected properly.

## What I Would Improve Next

If I continue this project, I would like to add:

- better error handling with proper status codes
- edit note support in the frontend UI
- logout handling
- loading and empty states with better UX
- environment variable setup instructions
- backend scripts for development and production
- deployment
- tests for auth and notes routes
