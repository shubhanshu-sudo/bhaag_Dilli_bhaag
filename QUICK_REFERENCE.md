# Quick Reference: Environment Configuration

## 🚀 Quick Start

### Local Development Setup
```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit .env.local (should already have localhost)
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# 3. Start dev server
npm run dev
```

---

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ Yes | Backend API base URL |

---

## 🔧 Usage in Code

### ✅ Correct Way
```typescript
import { API_ENDPOINTS } from '@/config/api';

// Use predefined endpoints
const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

// Or use the base URL
import { API_BASE_URL } from '@/config/api';
const response = await fetch(`${API_BASE_URL}/api/custom-endpoint`);
```

### ❌ Wrong Way
```typescript
// DON'T hardcode URLs
const response = await fetch('http://localhost:5000/api/register', ...);
const response = await fetch('https://api.example.com/api/register', ...);
```

---

## 📍 Available Endpoints

```typescript
API_ENDPOINTS.REGISTER                    // /api/register
API_ENDPOINTS.ADMIN.LOGIN                 // /api/admin/login
API_ENDPOINTS.ADMIN.REGISTRATIONS         // /api/admin/registrations
```

---

## 🌍 Environment Examples

### Local Development
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Production (Render)
```bash
NEXT_PUBLIC_API_BASE_URL=https://bhaag-dilli-bhaag-backend.onrender.com
```

### Production (Custom Domain)
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

---

## 🐛 Troubleshooting

### API calls failing?
1. Check `.env.local` exists
2. Verify `NEXT_PUBLIC_API_BASE_URL` is set
3. Restart dev server: `npm run dev`
4. Check browser console for actual URL being called

### Environment variable not updating?
1. **Local:** Restart dev server
2. **Production:** Redeploy application

### Getting localhost in production?
1. Set `NEXT_PUBLIC_API_BASE_URL` in hosting platform
2. Redeploy application

---

## 📦 Deployment (Vercel)

1. **Go to:** Project Settings → Environment Variables
2. **Add:**
   - Name: `NEXT_PUBLIC_API_BASE_URL`
   - Value: `https://your-backend-url.com`
   - Environment: Production
3. **Redeploy** the application

---

## 🔐 Security Notes

- ✅ Use `NEXT_PUBLIC_` for client-side variables
- ❌ Never put secrets in `NEXT_PUBLIC_` variables
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Commit `.env.example` as template

---

## 📚 More Information

- Full guide: `ENVIRONMENT_CONFIG.md`
- Deployment summary: `DEPLOYMENT_SUMMARY.md`
- Template: `.env.example`
