# 🚀 Quick Deploy to Vercel - Copy & Paste Commands

Your code is ready! Follow these steps:

---

## Step 1: Create GitHub Repository (Web Browser)

1. Go to: **https://github.com/new**
2. Repository name: `nutriai-diet-planner`
3. Description: `AI-powered personalized diet planner`
4. Keep it **Public**
5. **DON'T** check "Add README"
6. Click **Create repository**

---

## Step 2: Push to GitHub (Terminal Commands)

**IMPORTANT:** Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username in the command below!

```bash
# Navigate to your project (if not already there)
cd /Users/shalinigupta/FullStack/deitplanner

# Add your GitHub repository URL
# ⚠️ REPLACE 'YOUR_GITHUB_USERNAME' with your actual username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/nutriai-diet-planner.git

# Push your code
git branch -M main
git push -u origin main
```

You may be asked for your GitHub credentials. Enter them.

---

## Step 3: Deploy on Vercel (Web Browser)

1. Go to: **https://vercel.com/new**
2. Click **"Continue with GitHub"** (or login)
3. **Import Your Repository:**
   - Find `nutriai-diet-planner`
   - Click **Import**

4. **Configure Project:**
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅

5. **Add Environment Variable:**
   - Click **Environment Variables**
   - Name: `VITE_GROQ_API_KEY`
   - Value: `your_groq_api_key_from_console.groq.com`
   - Select all environments: ✅ Production ✅ Preview ✅ Development
   - Click **Add**

6. Click **Deploy** button

7. **Wait 1-2 minutes** ⏱️

8. **Success!** 🎉 You'll get a URL like:
   ```
   https://nutriai-diet-planner.vercel.app
   ```

---

## Step 4: Test Your Deployed App

1. Open your Vercel URL
2. Click "Generate Plan"
3. Fill in the form with your details
4. Click "Generate My Diet Plan"
5. Verify AI generates your diet plan

✅ **Working?** Congratulations! Your app is live!

---

## Alternative: Deploy via Vercel CLI (Faster)

If you prefer terminal:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts (accept defaults)

# Add environment variable
vercel env add VITE_GROQ_API_KEY
# Paste your API key when prompted

# Deploy to production
vercel --prod
```

Done! ✅

---

## Making Updates Later

Whenever you make changes:

```bash
# Make your changes to files
# Then:
git add .
git commit -m "Description of your changes"
git push
```

Vercel will **automatically** redeploy! 🚀

---

## Your API Key (Save This!)

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Add this to Vercel Environment Variables**
**Get your API key from: https://console.groq.com**

---

## Troubleshooting

### Can't push to GitHub?
```bash
# Configure git if this is your first time
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Try pushing again
git push -u origin main
```

### Build failed on Vercel?
- Check Vercel build logs
- Verify environment variable is added
- Try redeploying: Click the **⋯** menu → **Redeploy**

### App loads but can't generate plans?
- Verify `VITE_GROQ_API_KEY` is in Vercel environment variables
- Check browser console (F12) for errors
- Redeploy after adding the environment variable

---

## Need Help?

1. Check **DEPLOYMENT.md** for detailed guide
2. Read Vercel build logs for specific errors
3. Verify API key is correct in Vercel settings

---

**You're all set! 🎉 Your NutriAI app will be live in minutes!**
