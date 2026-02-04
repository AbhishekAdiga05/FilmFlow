# Quick Setup Guide

## Environment Variables Setup

1. **Create a `.env` file** in the root directory (same level as `package.json`)

2. **Add the following line** to the `.env` file:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

3. **Replace `your_api_key_here`** with your actual TMDB API key

4. **Get your free TMDB API key**:
   - Visit: https://www.themoviedb.org/
   - Sign up for a free account
   - Go to Settings → API
   - Request an API key (free tier is available)
   - Copy your API key and paste it in the `.env` file

## Important Notes

- The `.env` file should NOT be committed to git (it's already in `.gitignore`)
- Vite requires the `VITE_` prefix for environment variables to be accessible in the app
- After creating/modifying `.env`, restart the development server

## Installation Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** with your API key (see above)

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser** to `http://localhost:5173` (or the port shown in terminal)

## Build for Production

```bash
npm run build
```

The production files will be in the `dist` directory.
