# Deployment Guide - NutriAI to Vercel 🚀

This guide will help you deploy your NutriAI app to Vercel, starting from scratch (no GitHub repo needed initially).

## Prerequisites ✅

1. GitHub account (free) - [Sign up here](https://github.com/signup)
2. Vercel account (free) - [Sign up here](https://vercel.com/signup)
3. Your Groq API Key (you already have this)

---

## Option 1: Deploy via Vercel CLI (Fastest) ⚡

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

### Step 3: Deploy
```bash
vercel
```

Answer the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your username**
- Link to existing project? **No**
- Project name? **nutriai** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **No**

### Step 4: Add Environment Variable
```bash
vercel env add VITE_GROQ_API_KEY
```
- Environment: Select **Production**
- Value: Paste your Groq API key
- Add to Development/Preview? **Yes** (to both)

### Step 5: Redeploy with Environment Variable
```bash
vercel --prod
```

**Done!** 🎉 Your app is live! Vercel will give you a URL like `https://nutriai.vercel.app`

---

## Option 2: Deploy via Vercel Dashboard (Recommended for Beginners) 🌐

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon (top right) → **New repository**
3. Repository settings:
   - Name: `nutriai-diet-planner` (or your choice)
   - Description: `AI-powered personalized diet planner`
   - Visibility: **Public** (or Private)
   - **Don't** initialize with README (we have files already)
4. Click **Create repository**

### Step 2: Push Your Code to GitHub

Copy the commands from GitHub (or use these):

```bash
# Make sure you're in your project directory
cd /Users/shalinigupta/FullStack/deitplanner

# Add all files (excluding .env due to .gitignore)
git add .

# Commit your code
git commit -m "Initial commit: NutriAI diet planner app"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/nutriai-diet-planner.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Your `.env` file will NOT be uploaded (it's in .gitignore for security).

### Step 3: Connect Vercel to GitHub

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. If first time:
   - Click **Connect GitHub Account**
   - Authorize Vercel
5. Find your `nutriai-diet-planner` repository
6. Click **Import**

### Step 4: Configure Project Settings

1. **Framework Preset**: Vite (should auto-detect)
2. **Root Directory**: `./` (leave as is)
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `dist` (auto-filled)
5. **Install Command**: `npm install` (auto-filled)

### Step 5: Add Environment Variables

1. Click on **Environment Variables** section
2. Add variable:
   - **Key**: `VITE_GROQ_API_KEY`
   - **Value**: `your_groq_api_key_from_console.groq.com`
   - **Environments**: Check all (Production, Preview, Development)
3. Click **Add**

### Step 6: Deploy!

1. Click **Deploy** button
2. Wait 1-2 minutes for build to complete
3. **Success!** 🎉

You'll get a live URL like: `https://nutriai-diet-planner.vercel.app`

---

## Post-Deployment Steps 🔧

### Test Your Deployment

1. Visit your Vercel URL
2. Click "Generate Plan"
3. Fill in the form
4. Make sure diet plan generates correctly

### Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain (e.g., `nutriai.com`)
3. Follow DNS configuration instructions

### Update Your App

Whenever you make changes:

```bash
# Make your code changes
# Then commit and push
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy! 🚀

---

## Troubleshooting 🔧

### Build Failed?

**Check build logs** in Vercel dashboard for specific errors.

Common issues:
1. **Missing dependencies**: Run `npm install` locally first
2. **Environment variable**: Make sure `VITE_GROQ_API_KEY` is added
3. **Build command**: Should be `npm run build`

### API Key Not Working?

1. Go to Vercel Project → **Settings** → **Environment Variables**
2. Verify `VITE_GROQ_API_KEY` is set for all environments
3. Redeploy: **Deployments** → Click **⋯** on latest → **Redeploy**

### 404 on Routes?

1. Vercel should handle this automatically for Vite
2. If issues persist, create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Form Not Submitting?

1. Check browser console (F12) for errors
2. Verify API key is loaded: Check Network tab when generating
3. Try the deployed URL in incognito mode

---

## Security Notes 🔒

✅ **Good Practices We Followed:**
- `.env` file is in `.gitignore` (not uploaded to GitHub)
- Environment variables stored securely in Vercel
- API key never exposed in client code

⚠️ **Additional Security (Optional):**
- Use Groq API with rate limiting
- Consider adding backend proxy for API calls
- Monitor API usage in Groq console

---

## Vercel Free Tier Limits 💰

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Automatic CI/CD from GitHub

Perfect for your diet planner app! 🎉

---

## Quick Commands Reference 📝

```bash
# Deploy to Vercel (CLI)
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add VITE_GROQ_API_KEY

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

---

## Support & Resources 📚

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Guide](https://docs.github.com/en/get-started)

---

**Need Help?** Open an issue on your GitHub repository or contact Vercel support.

**Happy Deploying! 🚀**
