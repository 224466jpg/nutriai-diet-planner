# NutriAI - Personal AI Nutrition Coach 🥗

A beautiful, modern web application that generates personalized diet plans using AI. Built with React, Vite, TailwindCSS, and powered by Groq AI.

## Features ✨

- **Personalized Diet Plans**: Get custom meal plans based on your age, weight, height, goals, and preferences
- **Beautiful UI**: Modern, responsive design with smooth animations and glass-morphism effects
- **Multiple Diet Types**: Support for Vegetarian, Vegan, Non-Vegetarian, Keto, Paleo, and more
- **Activity-Based**: Plans tailored to your activity level (sedentary to very active)
- **Goal-Oriented**: Whether you want weight loss, muscle gain, or maintenance
- **Regional Cuisine**: Get meal plans specific to your country/region
- **BMI Calculation**: Automatic BMI calculation and health status assessment
- **Allergy Support**: Customize plans based on your food allergies and restrictions

## Tech Stack 🛠️

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS (via CDN), Material Symbols Icons, Google Fonts
- **AI**: Groq SDK (Llama 3.3 70B model)
- **State Management**: React Hooks

## Setup Instructions 🚀

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd deitplanner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

To get a Groq API key:
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it in your `.env` file


### 4. Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for production
```bash
npm run build
```

## How to Use 📱

1. **Click "Generate Plan"** button on the homepage
2. **Fill in your details** in the form:
   - Age, Weight, Height (required)
   - Gender
   - Fitness Goal (weight loss, muscle gain, etc.)
   - Activity Level
   - Diet Preference (vegetarian, vegan, etc.)
   - Country/Region
   - Meals per day preference
   - Any allergies or restrictions
3. **Click "Generate My Diet Plan"**
4. **Wait for AI** to create your personalized plan
5. **View, Copy, or Regenerate** your diet plan

## Features in Detail 🎯

### Personalization Options
- **Goals**: Weight Loss, Muscle Gain, Maintenance, Athletic Performance, General Health
- **Activity Levels**: Sedentary, Light, Moderate, Active, Very Active
- **Diet Types**: Vegetarian, Vegan, Non-Vegetarian, Eggetarian, Pescatarian, Keto, Paleo
- **Meals**: 3-6 meals per day

### AI-Generated Plan Includes
- BMI Calculation and Health Status
- Daily Calorie Target
- Macronutrients Breakdown (Protein, Carbs, Fats)
- Complete Meal Plan for each meal
- Hydration Guidelines
- Supplement Recommendations
- Weekly Progress Tracking Tips
- Food Alternatives and Meal Prep Ideas

## Project Structure 📁

```
deitplanner/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template with TailwindCSS CDN
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── .env                 # Environment variables (create this)
```

## Dependencies 📦

```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "groq-sdk": "^1.2.1"
}
```

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing 🤝

Contributions are welcome! Feel free to open issues or submit pull requests.

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Support 💬

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using React + Vite + Groq AI**
