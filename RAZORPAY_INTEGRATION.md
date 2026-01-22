# Razorpay Frontend Integration Guide

## Overview
This guide explains how the Razorpay payment integration works on the frontend of the Bhaag Dilli Bhaag registration system.

---

## Architecture

### Flow Diagram
```
User Registration → Payment Page → Razorpay Checkout → Backend Verification → Success/Failure
```

### Key Components

1. **`/utils/razorpay.ts`** - Razorpay utility functions
2. **`/app/register/payment/PaymentPageContent.tsx`** - Payment page component
3. **`/config/api.ts`** - API endpoint configuration

---

## Payment Flow

### Step 1: User Completes Registration
- User fills registration form at `/register/details`
- Form data is submitted to backend `/api/register`
- Registration ID and data are stored in localStorage
- User is redirected to `/register/payment?rid={registrationId}`

### Step 2: Payment Page Loads
- Payment page reads registration data from localStorage
- Validates that registration data exists
- Auto-initiates payment after 500ms delay

### Step 3: Create Razorpay Order
```typescript
const orderData = await createRazorpayOrder(raceCategory);
// Returns: { orderId, amount, currency, receipt }
```

**Backend determines the amount** - frontend never sends amount to backend.

### Step 4: Open Razorpay Checkout
```typescript
const razorpay = new window.Razorpay({
    key: RAZORPAY_KEY_ID,
    amount: orderData.amount * 100, // Convert to paise
    currency: 'INR',
    order_id: orderData.orderId,
    handler: onPaymentSuccess,
    prefill: { name, email, contact },
    theme: { color: '#1e3a8a' }
});
razorpay.open();
```

### Step 5: User Completes Payment
- User enters payment details in Razorpay modal
- Razorpay processes the payment
- On success, Razorpay calls the `handler` function with payment response

### Step 6: Verify Payment on Backend
```typescript
const verificationResponse = await verifyRazorpayPayment(
    {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    },
    registrationId
);
```

**Critical**: Backend verifies the payment signature using HMAC SHA256 before marking payment as successful.

### Step 7: Show Success/Failure
- If verification succeeds: Show success page with registration details
- If verification fails: Show error page with retry option

---

## Security Features

### ✅ Backend Price Determination
- Amount is **NEVER** sent from frontend
- Backend determines price based on race category
- Prevents price manipulation attacks

### ✅ Payment Signature Verification
- Backend verifies Razorpay signature using HMAC SHA256
- Ensures payment authenticity
- Prevents payment fraud

### ✅ No Frontend Payment Status
- Payment status is **ONLY** updated on backend after verification
- Frontend cannot mark payment as successful
- Database integrity is maintained

---

## Environment Variables

### Required Variables
```env
# Frontend (.env.local)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Backend (.env)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

---

## API Endpoints Used

### 1. Create Order
**Endpoint**: `POST /api/payments/create-order`

**Request**:
```json
{
  "raceCategory": "5KM"
}
```

**Response**:
```json
{
  "success": true,
  "orderId": "order_xxxxx",
  "amount": 699,
  "currency": "INR",
  "receipt": "receipt_5KM_1234567890",
  "raceCategory": "5KM"
}
```

### 2. Verify Payment
**Endpoint**: `POST /api/payments/verify-payment`

**Request**:
```json
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx",
  "registrationId": "mongodb_id"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "registrationId": "mongodb_id",
  "paymentStatus": "Completed"
}
```

---

## Payment States

The payment page has 5 states:

1. **Loading** - Initial state while fetching registration data
2. **Ready** - Registration data loaded, showing payment button
3. **Processing** - Razorpay checkout is open, waiting for user
4. **Success** - Payment verified successfully
5. **Failed** - Payment failed or verification failed

---

## Error Handling

### Common Errors

#### 1. Razorpay Script Load Failure
```typescript
if (!scriptLoaded) {
    throw new Error('Failed to load Razorpay SDK');
}
```

#### 2. Missing Registration Data
```typescript
if (!registrationData) {
    showToast('error', 'No registration found');
    router.push('/register');
}
```

#### 3. Payment Verification Failure
```typescript
if (!verificationResponse.success) {
    setPaymentStatus('failed');
    showToast('error', 'Payment verification failed');
}
```

#### 4. User Dismisses Payment Modal
```typescript
modal: {
    ondismiss: () => {
        setPaymentStatus('ready');
        showToast('info', 'Payment cancelled');
    }
}
```

---

## Testing

### Test Mode
Razorpay provides test cards for testing:

**Test Card Details**:
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

### Test UPI
- UPI ID: `success@razorpay`

### Test Flow
1. Register with test data
2. Proceed to payment
3. Use test card details
4. Verify payment success
5. Check database for updated payment status

---

## Utility Functions

### `loadRazorpayScript()`
Dynamically loads the Razorpay checkout script.

### `createRazorpayOrder(raceCategory)`
Calls backend to create a Razorpay order.

### `verifyRazorpayPayment(paymentData, registrationId)`
Calls backend to verify payment signature.

### `openRazorpayCheckout(options)`
Opens the Razorpay checkout modal.

### `initiateRazorpayPayment(params)`
Main function that orchestrates the entire payment flow.

---

## TypeScript Types

```typescript
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: { name?: string; email?: string; contact?: string };
    theme?: { color?: string };
    modal?: { ondismiss?: () => void };
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}
```

---

## Best Practices

### ✅ Do's
- Always verify payment on backend
- Use environment variables for keys
- Handle all error cases
- Show clear user feedback
- Clear localStorage after successful payment
- Auto-initiate payment for better UX

### ❌ Don'ts
- Never send amount from frontend
- Never mark payment successful on frontend
- Never store Razorpay secret key on frontend
- Never skip signature verification
- Never trust frontend payment status

---

## Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay script is loaded
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check browser console for errors

### Payment Verification Failing
- Verify backend `RAZORPAY_KEY_SECRET` is correct
- Check if signature generation matches Razorpay's algorithm
- Ensure all payment IDs are passed correctly

### Amount Mismatch
- Verify race category is correct
- Check backend `raceConfig.js` for correct prices
- Ensure amount is multiplied by 100 for Razorpay (paise)

---

## Next Steps

1. **Email Notifications**: Send confirmation emails after successful payment
2. **Webhook Integration**: Handle payment status updates via webhooks
3. **Refund Handling**: Implement refund logic if needed
4. **Payment History**: Show payment history in user dashboard
5. **Invoice Generation**: Generate and send invoices

---

## Support

For Razorpay-specific issues, refer to:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Test Mode](https://razorpay.com/docs/payments/payments/test-card-details/)
