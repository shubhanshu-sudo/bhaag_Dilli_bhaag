# 🔐 Admin Panel Frontend - Bhaag Dilli Bhaag

Minimal, professional admin panel for managing event registrations.

## 🎯 Features

- ✅ **Secure Login** - JWT-based authentication
- ✅ **Protected Routes** - Auto-redirect if not authenticated
- ✅ **Registrations List** - View all registrations in a table
- ✅ **Statistics Dashboard** - Real-time stats cards
- ✅ **Status Badges** - Visual indicators for payment status
- ✅ **Responsive Design** - Works on all devices
- ✅ **Clean UI** - Minimal and professional

---

## 📋 Routes

### Public Routes
- `/admin/login` - Admin login page

### Protected Routes (Require Authentication)
- `/admin/registrations` - View all registrations

---

## 🚀 Setup Instructions

### 1. Environment Variables

The `.env.local` file has been created with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

**For Production:**
Update this to your deployed backend URL:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.bhaagdillibhaag.com
```

### 2. Start Development Server

The Next.js dev server should already be running. If not:

```bash
cd my-app
npm run dev
```

Visit: `http://localhost:3000/admin/login`

---

## 🔌 Admin Panel Flow

### 1. Login Flow

```
User visits /admin/login
   ↓
Enter credentials:
  - Email: admin@bhaagdillibhaag.com
  - Password: Admin@123456
   ↓
Click "Sign In"
   ↓
POST /api/admin/login
   ↓
Receive JWT token
   ↓
Store token in localStorage
   ↓
Redirect to /admin/registrations
```

### 2. Registrations Page Flow

```
User visits /admin/registrations
   ↓
Check if token exists in localStorage
   ↓
If NO token → Redirect to /admin/login
   ↓
If token exists:
  GET /api/admin/registrations
  Authorization: Bearer <token>
   ↓
Display registrations table + stats
```

---

## 🎨 UI Components

### Login Page (`/admin/login`)

**Features:**
- Centered card layout
- Email and password inputs
- Loading state during login
- Error message display
- Auto-redirect if already logged in

**Design:**
- Gradient background (blue-50 to blue-100)
- White card with shadow
- Lock icon header
- Professional branding

### Registrations Page (`/admin/registrations`)

**Features:**
- Header with logout button
- Statistics cards (4 cards):
  - Total Registrations
  - Pending Payments
  - Completed Payments
  - Failed Payments
- Responsive table with columns:
  - Name
  - Email
  - Phone
  - Race (badge)
  - Amount
  - Status (colored badge)
  - Date

**Status Badges:**
- 🟢 **Paid** - Green badge (completed)
- 🟡 **Pending** - Yellow badge (pending)
- 🔴 **Failed** - Red badge (failed)

---

## 🔒 Authentication

### Auth Utility (`/utils/auth.ts`)

**Functions:**
- `getToken()` - Get JWT from localStorage
- `setToken(token)` - Store JWT in localStorage
- `logout()` - Clear token and redirect to login
- `isAuthenticated()` - Check if user is logged in
- `getAuthHeader()` - Get Authorization header object

**Usage:**
```typescript
import { authUtils } from '@/utils/auth';

// Check authentication
if (!authUtils.isAuthenticated()) {
    router.push('/admin/login');
}

// Make authenticated request
fetch(url, {
    headers: {
        ...authUtils.getAuthHeader()
    }
});

// Logout
authUtils.logout();
```

---

## 📊 Data Flow

### Login API Call

**Request:**
```typescript
POST http://localhost:5000/api/admin/login
Content-Type: application/json

{
  "email": "admin@bhaagdillibhaag.com",
  "password": "Admin@123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "email": "admin@bhaagdillibhaag.com"
  }
}
```

### Get Registrations API Call

**Request:**
```typescript
GET http://localhost:5000/api/admin/registrations
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "count": 150,
  "stats": {
    "total": 150,
    "pending": 45,
    "completed": 100,
    "failed": 5,
    "byRace": {
      "2KM": 50,
      "5KM": 70,
      "10KM": 30
    }
  },
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "race": "5KM",
      "tshirtSize": "L",
      "amount": 699,
      "paymentStatus": "pending",
      "createdAt": "2026-01-20T10:30:00.000Z"
    }
  ]
}
```

---

## 🛡️ Security Features

### 1. Protected Routes
- Check authentication on page load
- Auto-redirect to login if no token
- Token stored in localStorage (client-side only)

### 2. Token Handling
- JWT passed in Authorization header
- Bearer token format
- Automatic logout on 401 response

### 3. Error Handling
- Network errors caught and displayed
- 401 errors trigger automatic logout
- User-friendly error messages

---

## 📂 File Structure

```
my-app/
├── src/
│   ├── app/
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx           ✅ Login page
│   │       └── registrations/
│   │           └── page.tsx           ✅ Registrations list
│   └── utils/
│       └── auth.ts                    ✅ Auth utility
├── .env.local                         ✅ Environment variables
└── README_ADMIN_PANEL.md              ✅ This file
```

---

## 🧪 Testing

### 1. Test Login

1. Visit `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `admin@bhaagdillibhaag.com`
   - Password: `Admin@123456`
3. Click "Sign In"
4. Should redirect to `/admin/registrations`

### 2. Test Protected Route

1. Open browser DevTools → Application → Local Storage
2. Delete `admin_token` key
3. Try to visit `/admin/registrations`
4. Should redirect to `/admin/login`

### 3. Test Logout

1. Login successfully
2. Click "Logout" button on registrations page
3. Should redirect to `/admin/login`
4. Token should be removed from localStorage

---

## 🎨 Design Tokens

### Colors
- **Primary:** Blue-900 (#1e3a8a)
- **Background:** Gray-50
- **Success:** Green-600
- **Warning:** Yellow-600
- **Error:** Red-600

### Status Badge Colors
- **Paid:** bg-green-100, text-green-800
- **Pending:** bg-yellow-100, text-yellow-800
- **Failed:** bg-red-100, text-red-800

### Typography
- **Headings:** Font-bold
- **Body:** Font-normal
- **Labels:** Font-semibold

---

## 📱 Responsive Design

### Mobile (< 640px)
- Single column stats cards
- Horizontal scroll for table
- Full-width buttons

### Tablet (640px - 1024px)
- 2-column stats cards
- Optimized table spacing

### Desktop (> 1024px)
- 4-column stats cards
- Full table view
- Maximum width container

---

## 🔮 Not Implemented (As Per Requirements)

- ❌ Payment UI
- ❌ Admin user management
- ❌ Charts or analytics
- ❌ Edit or delete actions
- ❌ Multiple admin roles
- ❌ Registration export

---

## ⚠️ Important Notes

### Security
- Never commit `.env.local` to version control
- Always use HTTPS in production
- Rotate JWT_SECRET regularly in production

### Token Expiry
- Backend tokens expire in 24 hours
- User will need to re-login after expiry
- 401 response triggers automatic logout

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- LocalStorage required
- JavaScript must be enabled

---

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```
4. Deploy

### Backend URL

Update `.env.local` (or Vercel env vars) with your deployed backend URL:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.bhaagdillibhaag.com
```

---

## 📊 Table Columns

| Column | Type | Description |
|--------|------|-------------|
| Name | Text | Participant full name |
| Email | Text | Contact email |
| Phone | Text | 10-digit mobile number |
| Race | Badge | Race category (2KM/5KM/10KM) |
| Amount | Currency | Registration fee in ₹ |
| Status | Badge | Payment status (Paid/Pending/Failed) |
| Date | DateTime | Registration timestamp |

---

## ✅ Admin Panel Checklist

- ✅ Login page created
- ✅ Protected registrations page
- ✅ Auth utility implemented
- ✅ JWT token management
- ✅ Auto-redirect on auth failure
- ✅ Logout functionality
- ✅ Statistics cards
- ✅ Responsive table
- ✅ Status badges
- ✅ Error handling
- ✅ Loading states
- ✅ Environment variables
- ✅ Clean, minimal UI

---

## 🎉 Success!

Your admin panel is complete and ready to use!

**Login Credentials:**
- Email: `admin@bhaagdillibhaag.com`
- Password: `Admin@123456`

**Access URL:**
`http://localhost:3000/admin/login`

---

**Admin Panel Frontend: COMPLETE ✅**  
**Ready for Production: YES ✅**  
**Next Phase: Payment Integration 🔜**
