# The Studio - Quick Start Guide

## 🎨 Accessing The Studio

1. Launch RozmoWA
2. From Mission Control, click **"The Studio"** (sparkle icon)
3. Or navigate directly to `/studio`

---

## 🏭 The Factory: Generating Questions

### Step-by-Step

1. **Enter Topic**
   - Type any subject: "Grammar", "Vocabulary", "Reading Comprehension"
   - Topic is used for tagging and context

2. **Set Quantity**
   - Use the slider to select 1-200 questions
   - Number updates in real-time below the slider

3. **Click "Generate"**
   - Watch the sparkle animation
   - "Synthesizing..." appears
   - ~1.5 seconds processing time

4. **Review Generated Items**
   - Questions appear in center masonry grid
   - Each card shows:
     - Difficulty badge (beginner/intermediate/advanced)
     - Question text
     - 4 multiple-choice options
     - Correct answer highlighted
     - Tags for filtering

---

## 📚 Curating Your Collection

### Selecting Questions

**Click any question card to select it**
- Bookmark icon fills when selected
- Card border changes to dark
- Selection counter updates in left panel

**Select Multiple**
- Click multiple cards
- No limit on selection count
- Counter shows "n selected"

### Saving Options

#### Option 1: Add to Bank
**Use when**: You want to save individual questions for later use

1. Select questions
2. Click **"Add to Bank"** (bookmark icon)
3. Items appear in right panel "The Bank"
4. Toast notification confirms save
5. Selection clears

**Benefits**:
- Build a personal question pool
- Mix topics over time
- Search and filter later

#### Option 2: Save as Quiz
**Use when**: You want a complete, ready-to-use quiz

1. Select questions
2. Click **"Save as Quiz"** (library icon)
3. Quiz auto-generated with:
   - Title: "[Topic] Assessment"
   - Description: "Generated on [date]"
   - Unique cover color
4. Toast notification confirms save
5. Quiz appears in Quiz Library

**Benefits**:
- Immediate deployment
- Track usage and scores
- Magazine-style organization

---

## 🗄️ The Bank: Your Question Pool

### Searching
- Type in search box (top of right panel)
- Searches question text and tags
- Real-time filtering

### Viewing
- Compact card view
- Shows:
  - Question text (truncated)
  - Top 2 tags
- Hover for border highlight

### Using Banked Items
1. Search for specific topic
2. Note question IDs
3. Manually compose quiz in future release
   _(Current version: bank is view-only after save)_

---

## 📖 Quiz Library

### Accessing
1. Click **"Quiz Library"** from Mission Control
2. Or navigate to `/quiz-library`

### Browsing Quizzes
**Magazine-Style Grid**:
- 3 columns on desktop
- Portrait cover cards (3:4 aspect ratio)
- Each cover shows:
  - "QUIZ" label
  - Difficulty badge
  - Title (serif typography)
  - Question count
  - Created date
  - Last used date (if applicable)
  - Average score (if tracked)

**Hover Effect**:
- Border darkens
- View icon appears

### Viewing Quiz Details
1. Click any cover card
2. Full-screen modal opens
3. See all questions with:
   - Question text
   - All options
   - Correct answer highlighted
   - Explanation
   - Difficulty badge

### Managing Quizzes
**Use Quiz**:
- Click "Use Quiz" button
- Tracks usage timestamp
- Updates "Last used" metadata

**Delete Quiz**:
- Click "Delete" button (red border)
- Confirmation prompt
- Permanent removal from library

---

## 🎨 Design Philosophy

### Visual Language
- **Zinc Palette**: Sophisticated grayscale
- **Serif Labels**: Editorial, magazine-like
- **Bookmark Icon**: Universal save metaphor
- **Vast Whitespace**: Breathing room, luxury

### Interaction Patterns
- **Click to Select**: Natural, direct manipulation
- **Bookmark Fills**: Clear visual feedback
- **Toast Notifications**: Non-intrusive confirmation
- **Fluid Animations**: Polished, professional

---

## 💡 Pro Tips

### Efficient Workflows

**Bulk Generation**:
1. Generate 200 items
2. Quickly scan and select top 50
3. Save as quiz
4. Repeat for different topics

**Topic Organization**:
- Use consistent naming: "Grammar - Tenses", "Grammar - Articles"
- Tags auto-populate from topic
- Search uses tags for filtering

**Bank as Staging**:
1. Generate questions throughout week
2. Add favorites to bank
3. End of week: Compose quiz from bank

### Quality Curation
- Generate more than you need (e.g., 100 for final 20)
- Select only best questions
- Ignore low-quality auto-generated items
- Focus on clear, unambiguous options

### Library Maintenance
- Delete outdated quizzes
- Track "Last used" to find forgotten gems
- Use covers to visually organize by color

---

## 🔧 Troubleshooting

### "No items generated"
- Check topic field is not empty
- Ensure count is between 1-200
- Refresh page and try again

### "Bank items not appearing"
- Items save to localStorage
- Check browser allows localStorage
- Try clearing cache (dev tools → Application → Clear storage)

### "Quiz Library empty"
- Must use "Save as Quiz" button
- "Add to Bank" only saves to question pool
- Check Quiz Library route (`/quiz-library`)

### Performance Issues
- If >1000 items in bank, consider archival
- localStorage has 5-10MB limit
- Export/backup not yet implemented

---

## 📊 Limits & Capacity

| Resource         | Limit     | Notes                          |
|------------------|-----------|--------------------------------|
| Questions/batch  | 1-200     | Slider controlled              |
| Bank capacity    | ~5,000+   | localStorage dependent         |
| Quiz size        | Unlimited | Limited by selected count      |
| Generation speed | ~1.5s     | Consistent regardless of count |
| Search results   | Unlimited | Real-time filtering            |

---

## 🚀 Next Steps

### After Generating Your First Quiz
1. Navigate to Quiz Library
2. View your quiz cover
3. Click to preview all questions
4. Click "Use Quiz" to track usage

### Building Your Collection
1. Generate daily batches
2. Curate consistently
3. Build topic-specific libraries
4. Track which quizzes perform best

### Advanced Usage
- Mix difficulties in single quiz
- Use tags for cross-topic retrieval
- Build "greatest hits" from bank
- Export quizzes (future feature)

---

## 🎯 Key Takeaways

✅ **Generate**: Up to 200 unique questions per batch  
✅ **Select**: Click to bookmark favorites  
✅ **Save**: Add to bank or save as quiz  
✅ **Organize**: Magazine-style library covers  
✅ **Track**: Usage timestamps and scores  
✅ **Search**: Real-time filtering in bank  

**Goal**: Transform from quiz vending machine to professional assessment curator.

---

## Need Help?

- **Documentation**: See `ASSESSMENT_ECOSYSTEM.md` for technical details
- **Updates**: Check Mission Control for new features
- **Feedback**: Report issues via dev console logs

**Happy Curating!** 🎨
