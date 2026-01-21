# Environment Configuration Guide

## Overview

This document explains how environment variables are configured in the **Bhaag Dilli Bhaag** frontend application. All environment-specific values (API URLs, configuration settings) are managed through environment variables to ensure the application works correctly across different environments (local, staging, production).

---

## Environment Variables

### `NEXT_PUBLIC_API_BASE_URL`

**Required:** Yes  
**Type:** String (URL)  
**Description:** The base URL of the backend API server.

**Examples:**
```bash
# Local Development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Production (Render)
NEXT_PUBLIC_API_BASE_URL=https://bhaag-dilli-bhaag-backend.onrender.com

# Production (Custom Domain)
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

---

## Setup Instructions

### Local Development

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`:**
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

### Production Deployment (Vercel)

1. **Go to your Vercel project dashboard**

2. **Navigate to:** Settings → Environment Variables

3. **Add the following variable:**
   - **Name:** `NEXT_PUBLIC_API_BASE_URL`
   - **Value:** Your production backend URL (e.g., `https://bhaag-dilli-bhaag-backend.onrender.com`)
   - **Environment:** Production (or All if you want it for all environments)

4. **Redeploy your application** (required for environment variable changes to take effect)

### Production Deployment (Other Platforms)

For other hosting platforms (Netlify, Railway, etc.), add the environment variable through their respective dashboards or CLI tools.

---

## File Structure

```
my-app/
├── .env.example          # Template file (committed to git)
├── .env.local            # Local development (gitignored)
├── .env.production       # Production overrides (optional, gitignored)
├── src/
│   ├── config/
│   │   └── api.ts        # Centralized API configuration
│   └── ...
```

---

## How It Works

### 1. Centralized Configuration (`src/config/api.ts`)

All API endpoints are defined in a single file:

```typescript
// src/config/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    REGISTER: `${API_BASE_URL}/api/register`,
    ADMIN: {
        LOGIN: `${API_BASE_URL}/api/admin/login`,
        REGISTRATIONS: `${API_BASE_URL}/api/admin/registrations`,
    },
};
```

### 2. Usage in Components

Instead of hardcoding URLs, import from the config:

```typescript
import { API_ENDPOINTS } from '@/config/api';

// ✅ Good - Uses environment variable
const response = await fetch(API_ENDPOINTS.REGISTER, { ... });

// ❌ Bad - Hardcoded URL
const response = await fetch('http://localhost:5000/api/register', { ... });
```

---

## Important Notes

### NEXT_PUBLIC_ Prefix

- **Required for client-side access:** Variables used in browser code must have the `NEXT_PUBLIC_` prefix
- **Build-time replacement:** These variables are embedded in the JavaScript bundle at build time
- **Security:** Never put secrets (API keys, passwords) in `NEXT_PUBLIC_` variables - they are visible in the browser

### Build vs Runtime

- Environment variables with `NEXT_PUBLIC_` prefix are replaced at **build time**
- Changing them requires a **rebuild and redeploy**
- For runtime configuration, use server-side environment variables (without the prefix)

### Git Ignore

The following files are gitignored and should never be committed:
- `.env.local`
- `.env.production`
- `.env.development`

Only `.env.example` should be committed as a template.

---

## Troubleshooting

### Issue: API calls failing with 404 or connection errors

**Solution:** Check that `NEXT_PUBLIC_API_BASE_URL` is set correctly:

1. Verify `.env.local` exists and has the correct URL
2. Restart the dev server after changing environment variables
3. Check browser console for the actual URL being called

### Issue: Environment variable not updating

**Solution:** 

1. **Local development:** Restart the dev server (`npm run dev`)
2. **Production:** Redeploy the application after changing environment variables

### Issue: Getting localhost URL in production

**Solution:**

1. Ensure `NEXT_PUBLIC_API_BASE_URL` is set in your hosting platform's environment variables
2. Redeploy the application
3. Check the build logs to confirm the variable is being picked up

---

## Verification

To verify your environment configuration is working:

1. **Check the browser console** - Look for any warnings about missing environment variables
2. **Inspect network requests** - Verify API calls are going to the correct URL
3. **Test the application** - Try registering for a race or logging into the admin panel

---

## Adding New Environment Variables

If you need to add new environment variables:

1. **Add to `.env.example`** with documentation
2. **Add to this README** with description and examples
3. **Update `src/config/api.ts`** if it's an API-related variable
4. **Use the `NEXT_PUBLIC_` prefix** if it needs to be accessed in browser code
5. **Update deployment platform** environment variables
6. **Redeploy** the application

---

## Security Best Practices

✅ **DO:**
- Use environment variables for all URLs and configuration
- Keep `.env.local` in `.gitignore`
- Document all variables in `.env.example`
- Use `NEXT_PUBLIC_` only for non-sensitive, client-side values

❌ **DON'T:**
- Hardcode URLs or configuration in code
- Commit `.env.local` or `.env.production` to git
- Put API keys or secrets in `NEXT_PUBLIC_` variables
- Forget to update environment variables when deploying

---

## Support

For issues or questions about environment configuration:
1. Check this documentation
2. Verify your `.env.local` file matches `.env.example`
3. Check the browser console for warnings
4. Review the deployment platform's environment variable settings
