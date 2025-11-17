# GitHub Setup Guide

This guide will help you connect your portfolio site to GitHub and deploy it.

## Step 1: Initialize Git Repository

If you haven't already initialized git, run:

```bash
git init
```

## Step 2: Create a .gitignore File

Make sure you have a `.gitignore` file that excludes:
- `node_modules/`
- `.env` files
- Build outputs

If you don't have one, create it:

```bash
echo "node_modules/
dist/
.env
.DS_Store" > .gitignore
```

## Step 3: Add All Files to Git

```bash
git add .
git commit -m "Initial commit: Portfolio site"
```

## Step 4: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `portfolio-2025`)
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have files)
6. Click "Create repository"

## Step 5: Connect Local Repository to GitHub

GitHub will show you commands. Run these (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 6: Deploy to GitHub Pages (Free Hosting)

### Option A: Using GitHub Actions (Recommended)

1. Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. In your GitHub repository:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save

3. Push your changes:
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

### Option B: Using Vite Build + gh-pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Update `vite.config.js` (create if it doesn't exist):
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/', // Replace with your repo name
})
```

4. Deploy:
```bash
npm run deploy
```

## Step 7: Update Router for GitHub Pages

Since GitHub Pages serves from a subdirectory, update `App.jsx` to use HashRouter instead of BrowserRouter, or configure the base path.

Update `src/App.jsx`:
```jsx
import { HashRouter } from 'react-router-dom' // Change from BrowserRouter

// Then use HashRouter instead
<HashRouter>
  <Routes>
    ...
  </Routes>
</HashRouter>
```

## Alternative: Deploy to Vercel or Netlify (Easier)

### Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite and deploys!

### Netlify:
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

## Troubleshooting

- **404 errors on routes**: Use HashRouter or configure base path
- **Assets not loading**: Check base path in vite.config.js
- **Build fails**: Check Node version (should be 18+)

## Next Steps

1. Update the `workItems` array in `WorkPage.jsx` with your actual projects
2. Add images/content to each work card
3. Customize styling as needed
4. Test locally: `npm run dev`
5. Build and test: `npm run build && npm run preview`

