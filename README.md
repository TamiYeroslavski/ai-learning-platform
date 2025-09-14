
# AI Learning Platform

## Setup Instructions

1. Clone the repository:
	```bash
	git clone https://github.com/TamiYeroslavski/ai-learning-platform.git
	```
2. Install dependencies for backend:
	```bash
	cd backend
	npm install
	```
3. Install dependencies for frontend:
	```bash
	cd ../frontend
	npm install
	```
4. Create a `.env` file in the backend folder (see example below).
5. Start backend server:
	```bash
	npm run dev
	```
6. Start frontend server:
	```bash
	npm start
	```

## Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- React (TypeScript)
- Bootstrap
- Docker (optional)
- OpenAI API

## Assumptions Made
- Only the admin (password: `admin`) can add categories and subcategories or view user history.
- Users register with name and phone only.
- The backend runs on port 5001 by default, frontend on port 3000.
- MongoDB is running locally or via Docker.
- OpenAI API key is required for prompt responses.

## How to Run Locally

### Backend
1. Go to the `backend` folder.
2. Create a `.env` file (see example below).
3. Run:
	```bash
	npm run dev
	```

### Frontend
1. Go to the `frontend` folder.
2. Run:
	```bash
	npm start
	```

### Docker (optional)
1. Go to the `docker` folder.
2. Run:
	```bash
	docker-compose up
	```

## Sample .env Example File (backend/.env)
```env
MONGO_URI=mongodb://localhost:27017/ai-learning-platform
OPENAI_API_KEY=your_openai_api_key_here
PORT=5001
```

---
Feel free to contact for any questions or improvements!
