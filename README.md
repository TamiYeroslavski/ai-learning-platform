# AI-Driven Learning Platform (Mini MVP)

## Overview
A mini learning platform enabling users to select topics, send prompts to AI (OpenAI GPT), receive generated lessons, and view their learning history. Includes REST API backend, MongoDB database, OpenAI integration, and a React dashboard.

## Technologies Used
- Backend: Node.js (Express, TypeScript)
- Database: MongoDB (via Mongoose)
- Frontend: React (TypeScript)
- AI: OpenAI GPT API
- Auth: JWT (bonus)
- Docker Compose (for MongoDB)

## Setup Instructions
See below for running locally and configuring environment variables.

## Project Structure
- `/backend` - Node.js API server
- `/frontend` - React web dashboard
- `/docker` - Docker Compose files

## How to Run Locally
1. Clone the repo
2. See `/backend/README.md` and `/frontend/README.md` for setup
3. Use Docker Compose to start MongoDB

## Sample .env
See `.env.example` in `/backend` for required variables.

## Assumptions
- Only basic validation and error handling
- No email verification
- Admin dashboard is accessible via a simple route

## Usage
- Register, select category/sub-category, submit prompt, view AI lesson and history
- Admin: view all users and their prompt history

---

For full details, see documentation in each folder.
