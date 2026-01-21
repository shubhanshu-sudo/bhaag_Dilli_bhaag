#!/bin/bash

# Environment Configuration Verification Script
# This script helps verify that environment variables are properly configured

echo "🔍 Verifying Environment Configuration..."
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
else
    echo "❌ .env.local file NOT found"
    echo "   Run: cp .env.example .env.local"
    exit 1
fi

# Check if .env.example exists
if [ -f ".env.example" ]; then
    echo "✅ .env.example file exists"
else
    echo "⚠️  .env.example file NOT found (should be committed)"
fi

# Check if NEXT_PUBLIC_API_BASE_URL is set in .env.local
if grep -q "NEXT_PUBLIC_API_BASE_URL=" ".env.local"; then
    API_URL=$(grep "NEXT_PUBLIC_API_BASE_URL=" ".env.local" | grep -v "^#" | head -1 | cut -d '=' -f 2-)
    if [ -n "$API_URL" ]; then
        echo "✅ NEXT_PUBLIC_API_BASE_URL is set to: $API_URL"
    else
        echo "⚠️  NEXT_PUBLIC_API_BASE_URL is defined but empty"
    fi
else
    echo "❌ NEXT_PUBLIC_API_BASE_URL is NOT set in .env.local"
    exit 1
fi

# Check if src/config/api.ts exists
if [ -f "src/config/api.ts" ]; then
    echo "✅ Centralized API config exists (src/config/api.ts)"
else
    echo "❌ src/config/api.ts NOT found"
    exit 1
fi

# Check for hardcoded localhost URLs in source files (excluding config)
echo ""
echo "🔍 Checking for hardcoded localhost URLs in source files..."
HARDCODED=$(grep -r "localhost:5000" src/ --include="*.tsx" --include="*.ts" --exclude="api.ts" 2>/dev/null || true)
if [ -z "$HARDCODED" ]; then
    echo "✅ No hardcoded localhost URLs found in source files"
else
    echo "⚠️  Found hardcoded localhost URLs:"
    echo "$HARDCODED"
fi

# Check TypeScript compilation
echo ""
echo "🔍 Checking TypeScript compilation..."
if npx tsc --noEmit > /dev/null 2>&1; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    echo "   Run: npx tsc --noEmit"
    exit 1
fi

echo ""
echo "✅ Environment configuration verification complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Start dev server: npm run dev"
echo "   2. Test registration: http://localhost:3000/register"
echo "   3. Test admin panel: http://localhost:3000/admin/login"
echo ""
echo "📚 Documentation:"
echo "   - Quick reference: QUICK_REFERENCE.md"
echo "   - Full guide: ENVIRONMENT_CONFIG.md"
echo "   - Deployment: DEPLOYMENT_SUMMARY.md"
