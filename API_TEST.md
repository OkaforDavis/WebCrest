# WebCrest API Testing Guide

## Flutterwave Payment Integration Testing

### Test API Keys (Flutterwave)

**Test Public Key:**
```
FLWPUBK_TEST-0000000000000000000000000000000000000000
```

**Test Secret Key:**
```
FLWSECK_TEST-0000000000000000000000000000000000000000
```

### Test Card Details

Use these test card numbers with any future expiry date and any CVV:

| Card Type | Card Number | CVV | Expected Result |
|-----------|-------------|-----|-----------------|
| Visa Success | 4187427415564246 | 828 | Success |
| Visa Declined | 4111111111111111 | 856 | Declined |
| Mastercard Success | 5438898014560229 | 381 | Success |
| Mastercard Declined | 5425233010103291 | 001 | Declined |
| Verve | 5061020000000000001 | 123 | Success |

### Test Mobile Money Numbers (For Mtn, Airtel, Vodafone)

```
0556414145 (Success)
0554445555 (Failed)
```

### Test USSD Numbers

```
*901*01# (Success)
*901*02# (Declined)
```

---

## How to Use Test Keys

### 1. Update script.js with Test Keys

Replace the placeholder in script.js (line 69):

```javascript
public_key: "FLWPUBK_TEST-0000000000000000000000000000000000000000", // Test public key
```

### 2. Backend Integration (If Applicable)

For backend payment processing, use:

```
Secret Key: FLWSECK_TEST-0000000000000000000000000000000000000000
```

### 3. Test Transaction Reference Format

```
WEBCREST-TEST-{timestamp}
Example: WEBCREST-TEST-1703704800000
```

---

## Testing Scenarios

### Scenario 1: Successful Quote Request Payment

1. Fill the quote form with:
   - Name: Test User
   - Email: test@example.com
   - Service: Web Development
   - Message: Test payment processing

2. Click "Submit Quote"

3. Use test card: **4187427415564246**
   - Expiry: Any future date (e.g., 12/25)
   - CVV: 828

4. Expected Result: ✅ Success confirmation dialog

### Scenario 2: Declined Payment

1. Fill the quote form similarly

2. Use test card: **4111111111111111**
   - Expiry: Any future date
   - CVV: 856

3. Expected Result: ❌ Declined payment dialog

### Scenario 3: Test Contact Form

1. Go to Contact section
2. Fill contact form (no payment required)
3. Submit
4. Expected Result: Success message with SweetAlert

---

## API Response Codes

| Code | Status | Meaning |
|------|--------|---------|
| 00 | Approved | Transaction successful |
| 05 | Generic Decline | Card declined for unknown reason |
| 51 | Insufficient Funds | Not enough balance |
| 54 | Expired Card | Card has expired |
| 61 | Exceeds Amount | Transaction amount too high |
| 62 | Restricted Card | Card usage restricted |
| 63 | Security Violation | Security check failed |
| 65 | Retry Limit | Too many attempts |
| 75 | Pin Tries Exceeded | Wrong PIN entered too many times |
| 76 | Invalid Pin | Incorrect PIN entered |
| 78 | Account Blocked | Account is blocked |
| 81 | PIN Cryptography | PIN encryption failed |
| 82 | Invalid CVV | Invalid card verification value |

---

## Webhook Testing (For Production)

When implementing webhooks, use this URL structure:

```
POST /api/payment/webhook
Content-Type: application/json

{
  "data": {
    "id": 123456789,
    "txRef": "WEBCREST-TEST-1703704800000",
    "status": "successful",
    "amount": 5000,
    "currency": "NGN",
    "customer": {
      "email": "test@example.com",
      "name": "Test User"
    },
    "createdAt": "2025-12-27T10:00:00.000Z"
  }
}
```

---

## Current Implementation Status

✅ **Implemented:**
- Contact form with SweetAlert notifications
- Quote form with Flutterwave payment integration
- Form validation
- Mobile menu functionality
- AOS animations

⚠️ **For Full Production:**
- [ ] Replace test keys with live keys
- [ ] Implement backend webhook handling
- [ ] Add payment history tracking
- [ ] Set up email notifications for quote requests
- [ ] Implement order/transaction database

---

## Testing Checklist

- [ ] Test successful payment flow
- [ ] Test declined payment flow
- [ ] Test contact form submission
- [ ] Test form validation
- [ ] Test mobile responsiveness
- [ ] Test navigation and animations
- [ ] Verify email integration (when backend ready)
- [ ] Check webhook responses (when backend ready)

---

## Next Steps

1. **Replace Test Keys** - Update to live Flutterwave keys when ready for production
2. **Backend Setup** - Create backend service to handle payment verification
3. **Database Integration** - Store quote requests and payment records
4. **Email Notifications** - Send confirmation emails to users and admin
5. **Admin Dashboard** - View and manage quote requests and transactions

---

## Support Links

- **Flutterwave Documentation:** https://developer.flutterwave.com/docs
- **Flutterwave Test Environment:** https://app.flutterwave.com (Sign up for test account)
- **Payment Gateway Docs:** https://developer.flutterwave.com/reference/get-transactions

---

*Last Updated: December 27, 2025*
