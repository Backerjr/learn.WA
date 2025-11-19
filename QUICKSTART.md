# ⚡ Quick Start Guide

## 🚀 Start the Application (Development)

### Terminal 1 - Backend API
```bash
cd /workspaces/learn.WA
python3 api/server.py
```
✅ Server running at: `http://127.0.0.1:5000`

### Terminal 2 - Frontend Dev Server
```bash
cd /workspaces/learn.WA
npm run dev
```
✅ App running at: `http://localhost:5173`

---

## 🎯 Quick Feature Test

### 1. View the New Homepage
1. Open browser: `http://localhost:5173`
2. See hero image with your name
3. Notice glassmorphism badges
4. Hover over course cards (they scale up!)

### 2. Create a Quiz
1. Click sidebar: "Teacher Mode"
2. Paste some text or enter a topic: "Present Perfect Tense"
3. Configure: Grammar focus, Intermediate, 5 questions
4. Click "Craft Assessment"
5. ⏱️ Wait 3-5 seconds

### 3. Edit the Quiz
1. Click any question text → Edit inline
2. Click any answer option → Edit inline
3. Press Enter to save
4. Click "Save to Class Library"
5. ✅ Success toast appears

### 4. Verify Persistence
1. Refresh the page (`Ctrl+R` / `Cmd+R`)
2. Click "Quiz Library" in sidebar
3. Your saved quiz should appear
4. Or check database directly:
   ```bash
   sqlite3 learn_wa.db "SELECT * FROM quizzes;"
   ```

### 5. Test Navigation
1. Click sidebar: "Quiz"
2. Take a quiz
3. Click ✕ button (top-left)
4. ✅ Returns to Mission Control

---

## 📊 Verify Database

```bash
# Check if database exists
ls -la learn_wa.db

# View schema
sqlite3 learn_wa.db ".schema"

# Count quizzes
sqlite3 learn_wa.db "SELECT COUNT(*) FROM quizzes;"

# View all quizzes
sqlite3 learn_wa.db "SELECT id, title, topic FROM quizzes;"
```

---

## 🧪 Test API Endpoints

```bash
# Health check
curl http://127.0.0.1:5000/api/health

# Get all quizzes
curl http://127.0.0.1:5000/api/quizzes | jq

# Get specific quiz
curl http://127.0.0.1:5000/api/quizzes/1 | jq

# Create quiz (example)
curl -X POST http://127.0.0.1:5000/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Quiz",
    "topic": "Grammar",
    "difficulty": "intermediate",
    "questions": [{
      "question": "Test?",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "A",
      "explanation": "Because A"
    }]
  }' | jq
```

---

## 🏗️ Build for Production

```bash
# Install dependencies (if needed)
npm install

# Build frontend
npm run build

# Output directory
ls -la dist/

# Bundle size
du -sh dist/
```

**Deploy `dist/` folder to any static host:**
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront
- Your own server

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check Python version
python3 --version  # Need 3.7+

# Install dependencies
pip3 install flask flask-cors

# Check port availability
lsof -i :5000
```

### Frontend won't start
```bash
# Check Node version
node --version  # Need 16+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port availability
lsof -i :5173
```

### Database issues
```bash
# Reset database (CAUTION: deletes all data)
rm learn_wa.db

# Restart backend (auto-creates schema)
python3 api/server.py
```

### API not connecting
```bash
# Check .env or vite.config.ts
# Ensure VITE_API_URL points to backend

# Default: /api (proxied by Vite)
# Or: http://127.0.0.1:5000/api
```

---

## 📱 Mobile Testing

### Local Network Access
```bash
# Find your IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Access from phone on same network
http://YOUR_IP:5173
```

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🎨 Visual Features to Check

### Hero Section
- ✅ Full-width background image
- ✅ Gradient overlay
- ✅ Large serif typography
- ✅ Glassmorphism badges
- ✅ Dual CTA buttons

### Course Cards
- ✅ Photo backgrounds
- ✅ Hover scale effect (1.05x)
- ✅ Smooth transitions (500ms)
- ✅ Gradient text overlays

### Stats Cards
- ✅ Color-coded (green/blue/orange)
- ✅ Icons match colors
- ✅ Hover effects
- ✅ Gradient borders

### Quiz Editor
- ✅ Click-to-edit questions
- ✅ Click-to-edit options
- ✅ Hover cursor changes
- ✅ Auto-focus on edit

---

## ⚡ Performance Checklist

```bash
# Build size
npm run build
# Should be: ~385KB (112KB gzipped)

# Lighthouse score (optional)
npx lighthouse http://localhost:5173 --view

# Check for console errors
# Open browser DevTools → Console
# Should be: 0 errors
```

---

## 📚 Next Steps

1. **Read Full Docs:**
   - `MISSION_COMPLETE.md` - Full implementation details
   - `QUIZ_FEATURE_GUIDE.md` - User and API guide
   - `CHANGELOG.md` - All changes listed

2. **Customize:**
   - Replace Unsplash images with your own
   - Update color scheme in `tailwind.config.js`
   - Add more quiz question types

3. **Deploy:**
   - Choose hosting provider
   - Set up CI/CD pipeline
   - Configure environment variables

4. **Extend:**
   - Add Quiz Library UI
   - Implement analytics
   - Add user authentication
   - Create teacher dashboard

---

## 🎯 Expected Output

### Console (Backend)
```
Starting Learn.WA API server with SQLite database...
 * Running on http://127.0.0.1:5000
 * Debugger is active!
```

### Console (Frontend)
```
VITE v7.2.2  ready in 397 ms

➜  Local:   http://localhost:5173/
➜  Network: http://10.0.3.2:5173/
```

### Browser (Homepage)
```
[Large hero image with your name]
[Two photo-based course cards]
[Three colorful stats cards]
[Smooth hover animations]
```

---

## ✅ Success Indicators

- [ ] Both servers running (no errors)
- [ ] Homepage loads with hero image
- [ ] Can create and save a quiz
- [ ] Quiz persists after refresh
- [ ] Navigation works (all 5 links)
- [ ] Quiz screen has back button
- [ ] Database file exists (`learn_wa.db`)
- [ ] API responds to health check

**All checked? You're ready to go! 🚀**

---

## 🆘 Need Help?

1. Check error messages in terminal
2. Check browser console for errors
3. Review `MISSION_COMPLETE.md` for details
4. Verify all dependencies installed
5. Ensure ports 5000 and 5173 are free

---

**Quick Start Complete!** 🎉

For detailed information, see:
- `MISSION_COMPLETE.md` - Implementation details
- `QUIZ_FEATURE_GUIDE.md` - Feature documentation
- `BEFORE_AFTER_SUMMARY.md` - Visual comparison
