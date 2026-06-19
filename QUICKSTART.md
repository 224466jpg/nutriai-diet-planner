# Quick Start Guide 🚀

## Get Your App Running in 3 Minutes!

### Step 1: Install Dependencies (30 seconds)
```bash
npm install
```

### Step 2: Verify Your API Key (10 seconds)
Your `.env` file already has a Groq API key configured:
```
VITE_GROQ_API_KEY="your_groq_api_key_here"
```

> ⚠️ **Note**: Get your API key from https://console.groq.com and add it to your `.env` file!

### Step 3: Start Development Server (10 seconds)
```bash
npm run dev
```

Your app will open at: **http://localhost:5173**

---

## How to Use the App 📱

### 1. Click "Generate Plan"
Click any of the green "Generate Plan" buttons on the page

### 2. Fill Your Details
A beautiful form will appear. Fill in:
- **Age**: Your age (e.g., 25)
- **Weight**: In kilograms (e.g., 70)
- **Height**: In centimeters (e.g., 170)
- **Gender**: Male/Female/Other
- **Goal**: What you want to achieve
- **Activity Level**: How active you are
- **Diet Type**: Your food preferences
- **Country**: For regional foods
- **Meals Per Day**: How many meals you want
- **Allergies**: Any foods to avoid (optional)

### 3. Generate Your Plan
Click the "Generate My Diet Plan" button at the bottom

### 4. View Your Results
Wait a few seconds for AI to create your personalized diet plan!

The plan will include:
- ✅ Your BMI and health status
- ✅ Daily calorie target
- ✅ Protein, carbs, and fats breakdown
- ✅ Complete meal plan for each meal
- ✅ Hydration tips
- ✅ Supplement suggestions
- ✅ Progress tracking advice

### 5. Save or Regenerate
- **Copy to Clipboard**: Click to copy the entire plan
- **Regenerate**: Get a new variation
- **Close**: Exit the modal

---

## Example User Inputs

### For Weight Loss:
- Age: 30
- Weight: 80 kg
- Height: 165 cm
- Goal: Weight Loss
- Activity: Moderate (3-5 days/week)
- Diet: Vegetarian

### For Muscle Gain:
- Age: 25
- Weight: 70 kg
- Height: 175 cm
- Goal: Muscle Gain
- Activity: Very Active
- Diet: Non-Vegetarian

### For General Health:
- Age: 35
- Weight: 65 kg
- Height: 160 cm
- Goal: General Health
- Activity: Light
- Diet: Vegan

---

## Troubleshooting 🔧

### App won't start?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API Error?
- Check your `.env` file has the API key
- Make sure the key starts with `VITE_GROQ_API_KEY=`
- Restart the dev server after changing `.env`

### Form not showing?
- Check browser console for errors (F12)
- Try refreshing the page
- Clear browser cache

### Plan generation slow?
- AI generation takes 3-10 seconds (normal)
- Groq's free tier might have rate limits
- Try again in a few seconds

---

## What Makes This Special? ✨

1. **No Backend Needed**: Pure frontend app
2. **Beautiful UI**: Modern glass-morphism design
3. **Fully Personalized**: 10+ customization options
4. **Fast AI**: Uses Groq's ultra-fast inference
5. **Regional Support**: Cuisine from any country
6. **Mobile Friendly**: Works on all devices

---

## Next Steps 🎯

1. Try different combinations of goals and diets
2. Test with various activity levels
3. Add your real health data
4. Share with friends and family
5. Bookmark your favorite plans

---

**Enjoy your personalized nutrition journey! 💪**
