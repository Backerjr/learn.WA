# 🎯 AI Quiz Engine - User Guide

## Quick Start

### For Teachers: Creating and Saving Quizzes

1. **Navigate to Assessment Engine**
   - Click sidebar → "Teacher Mode"
   - Or go directly to `/teacher/create`

2. **Generate a Quiz**
   - **Option A:** Paste source material (article, passage, text)
   - **Option B:** Enter a topic (e.g., "Present Perfect Tense")
   - Configure:
     - Focus: vocab / grammar / comprehension
     - Difficulty: beginner / intermediate / advanced
     - Question count: 1-10
   - Click "Craft Assessment"

3. **Edit Your Quiz**
   - ✏️ **Edit Questions:** Click any question text to edit inline
   - ✏️ **Edit Options:** Click any answer option to edit
   - 🔄 **Regenerate:** Click refresh icon on individual questions
   - ✅ Correct answers remain marked with green checkmark

4. **Save to Library**
   - Click "Save to Class Library"
   - Quiz is permanently stored in SQLite
   - Success toast appears
   - Quiz now available in Quiz Library

### For Students: Taking Quizzes

1. **Access Quiz Mode**
   - Click sidebar → "Quiz"
   - Or go to `/quiz`

2. **During Quiz**
   - Select answers with radio buttons
   - "Check Answer" to verify
   - "Next Question" to continue
   - "Skip" to move without answering

3. **Exit Quiz**
   - Click the ✕ button top-left
   - Returns to Mission Control

---

## API Reference

### Create Quiz
```bash
POST /api/quizzes
Content-Type: application/json

{
  "title": "Grammar Fundamentals",
  "topic": "Present Perfect",
  "difficulty": "intermediate",
  "focus_mode": "grammar",
  "metadata": {"estimatedTime": 15},
  "questions": [
    {
      "question": "Which is correct?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option A",
      "explanation": "Because..."
    }
  ]
}
```

**Response:** Full quiz object with ID

### Get All Quizzes
```bash
GET /api/quizzes
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Grammar Fundamentals",
    "topic": "Present Perfect",
    "difficulty": "intermediate",
    "focus_mode": "grammar",
    "question_count": 5,
    "created_at": "2025-11-19 13:55:22"
  }
]
```

### Get Single Quiz
```bash
GET /api/quizzes/1
```

**Response:** Full quiz with all questions and options

---

## Database Schema

### Quizzes Table
```sql
id              INTEGER PRIMARY KEY
title           TEXT NOT NULL
topic           TEXT
difficulty      TEXT DEFAULT 'intermediate'
focus_mode      TEXT DEFAULT 'comprehension'
metadata        TEXT (JSON)
created_at      TIMESTAMP
```

### Questions Table
```sql
id              INTEGER PRIMARY KEY
quiz_id         INTEGER (FK to quizzes)
text            TEXT NOT NULL
options         TEXT (JSON array)
correct_answer  TEXT
explanation     TEXT
```

**Cascade Delete:** Deleting a quiz removes all its questions

---

## File Locations

**Database:**
```
/workspaces/learn.WA/learn_wa.db
```

**Backend:**
```
/workspaces/learn.WA/api/
├── database.py    (Schema + CRUD functions)
└── server.py      (REST endpoints)
```

**Frontend:**
```
/workspaces/learn.WA/src/
├── services/api.ts              (API client)
├── screens/
│   ├── AIQuizCreator.tsx       (Quiz editor)
│   ├── QuizScreen.tsx          (Quiz player)
│   ├── QuizLibrary.tsx         (Saved quizzes)
│   └── MissionControlScreen.tsx (Homepage)
└── App.tsx                      (Routes)
```

---

## Navigation Map

```
/                  → Mission Control (Homepage)
/learn             → Lessons (Core learning)
/courses           → Classes (Browse all classes)
/quiz              → Quiz Mode (Take quizzes)
/teacher           → Teacher Dashboard
/teacher/create    → AI Quiz Creator ⭐
/studio            → Assessment Studio
/quiz-library      → Quiz Library (View saved)
```

---

## Keyboard Shortcuts

**Quiz Editor:**
- `Click` question text → Edit mode
- `Click` option text → Edit mode
- `Enter` → Save and exit edit mode
- `Esc` → Cancel edit (blur)

---

## Design Patterns

### Editing UX
- **Inline Editing:** No modal dialogs
- **Visual Feedback:** Hover states on editable elements
- **Cursor Hints:** `cursor-text` class on editable fields
- **Auto-focus:** Inputs focus immediately
- **Subtle Borders:** Primary color on active edit

### Visual Hierarchy
- **Hero Section:** 500px tall, full-width image
- **Course Cards:** 288px (h-72), photo backgrounds
- **Stats Cards:** Glassmorphism with gradients
- **Hover Effects:** scale-105, duration-300/500

---

## Troubleshooting

### Quiz Not Saving
**Issue:** "Save to Library" shows error
**Solution:**
1. Check API server is running: `python3 api/server.py`
2. Verify database exists: `ls -la learn_wa.db`
3. Check console for network errors

### Navigation Not Working
**Issue:** Clicking sidebar links doesn't navigate
**Solution:**
1. Verify React Router is initialized
2. Check browser console for errors
3. Ensure all route components exist

### Images Not Loading
**Issue:** Homepage shows broken images
**Solution:**
1. Check internet connection (Unsplash CDN)
2. Images are external URLs, not local assets
3. Fallback: Replace with local images in `/public`

---

## Performance Notes

**Quiz Creation:**
- AI generation: ~3-5 seconds
- Database save: <100ms
- Typical flow: 5-10 seconds total

**Page Load:**
- Mission Control: <500ms (with hero image)
- Quiz Editor: <200ms
- Quiz Player: <100ms

**Database:**
- SQLite file size: ~100KB (empty)
- ~1KB per quiz with 5 questions
- Scales to 10,000+ quizzes easily

---

## Best Practices

### For Teachers

1. **Review Before Saving**
   - Always review AI-generated content
   - Edit for accuracy and clarity
   - Check that correct answers are marked

2. **Use Descriptive Titles**
   - Good: "Unit 3: Present Perfect - Assessment"
   - Bad: "Quiz 1"

3. **Set Appropriate Difficulty**
   - Match to student level
   - Consider question complexity

### For Developers

1. **API Calls**
   - Use typed interfaces (`Quiz`, `CreateQuizRequest`)
   - Always handle errors with try/catch
   - Show user-friendly error messages

2. **Database**
   - Never modify schema in production
   - Use migrations for schema changes
   - Backup database before major updates

3. **Frontend**
   - Keep components focused (single responsibility)
   - Extract reusable UI into components
   - Test edit modes thoroughly

---

## Version History

**v1.0.0** (2025-11-19)
- ✅ SQLite persistence
- ✅ Quiz creation via API
- ✅ Inline editing (questions + options)
- ✅ Hero section with images
- ✅ Teacher Mode separation
- ✅ Back button in Quiz screen

---

## Support

**Database Issues:**
- Delete `learn_wa.db` to reset
- Server auto-creates on startup

**Frontend Issues:**
- Clear browser cache
- `npm run build` to verify no errors

**API Issues:**
- Check server logs
- Test endpoints with curl
- Verify CORS is enabled

---

*For additional help, see MISSION_COMPLETE.md*
