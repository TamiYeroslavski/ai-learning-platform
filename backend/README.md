# Backend Setup

## Requirements
- Node.js (v18+ recommended)
- MongoDB (local or via Docker)

## Setup
1. Copy `.env.example` to `.env` and fill in your values
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `/api/users` - User registration & listing
- `/api/categories` - Categories & sub-categories
- `/api/prompts` - Submit prompt, get response, view history
- `/api/admin` - Admin dashboard

## Technologies
- Express, TypeScript, Mongoose, JWT, OpenAI
