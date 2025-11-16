# Learn.WA - Full Stack Setup Guide

## Overview
Learn.WA is a full-stack English learning platform with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Flask REST API + Python
- **Data**: English class management system

## Prerequisites
- Node.js 20+ and npm
- Python 3.12+
- Git

## Quick Start

### 1. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
pip install -r requirements.txt
```

### 2. Run the Application

#### Option A: Run Both (Recommended for Development)
```bash
# Install concurrently if needed
npm install -g concurrently

# Run frontend and backend together
npm run dev:full
```

#### Option B: Run Separately

**Terminal 1 - Backend API**:
```bash
npm run api
# or
python3 api/server.py
```
The API will start on `http://localhost:5000`

**Terminal 2 - Frontend**:
```bash
npm run dev
```
The frontend will start on `http://localhost:5173`

### 3. Access the Application
- Frontend: http://localhost:5173
- API Health Check: http://localhost:5000/api/health
- API Docs: See API section below

## Project Structure

```
learn.WA/
├── api/
│   └── server.py           # Flask REST API server
├── scripts/
│   ├── english_classes.py  # Class management library
│   ├── bulk_create_classes.py
│   └── class_specs.json    # Sample class data
├── src/
│   ├── components/         # React components
│   ├── screens/            # Page components
│   ├── services/
│   │   └── api.ts          # API client
│   └── App.tsx
├── package.json
├── requirements.txt
└── vite.config.ts
```

## API Endpoints

### Health & Info
- `GET /api/health` - Health check
- `GET /api/levels` - Get valid class levels

### Classes
- `GET /api/classes` - Get all classes (supports ?level= and ?teacher= filters)
- `GET /api/classes/:id` - Get specific class
- `POST /api/classes` - Create new class
- `POST /api/classes/bulk` - Create multiple classes

### Enrollment
- `POST /api/classes/:id/enroll` - Enroll student
- `GET /api/classes/:id/students` - Get enrolled students

## Example API Usage

### Create a Class
```bash
curl -X POST http://localhost:5000/api/classes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Business English",
    "level": "Intermediate",
    "teacher": "Sarah",
    "days": ["Monday", "Wednesday"],
    "start_time": "18:00",
    "end_time": "19:30",
    "capacity": 15
  }'
```

### Enroll a Student
```bash
curl -X POST http://localhost:5000/api/classes/1/enroll \
  -H "Content-Type: application/json" \
  -d '{"student_name": "John Doe"}'
```

## Development

### Frontend
- Hot reload enabled via Vite
- API calls proxy through Vite dev server to avoid CORS
- TypeScript for type safety

### Backend
- Flask debug mode enabled for development
- CORS enabled for frontend integration
- In-memory storage (can be replaced with database)

## Build for Production

### Frontend
```bash
npm run build
```
Output: `dist/` directory

### Backend
For production, consider:
1. Use a production WSGI server (gunicorn, uWSGI)
2. Add database persistence (SQLite, PostgreSQL)
3. Implement authentication
4. Add rate limiting

## Environment Variables

Create `.env` file for custom configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Errors
- Make sure both frontend and backend are running
- Check that Vite proxy is configured correctly
- Verify Flask-CORS is installed

### API Not Loading Data
- Check that `scripts/class_specs.json` exists
- Verify Python path includes `scripts/` directory
- Check console for error messages

## Next Steps
- [ ] Add SQLite database persistence
- [ ] Implement user authentication
- [ ] Add real-time updates with WebSockets
- [ ] Deploy to production (Vercel + Heroku/Railway)
