# Repair Quote Form Misuse Prevention

Prepared: 2026-08-30

## Executive Summary

A customer recently used the repair quote phone number field to submit a message instead of a usable contact number. This created avoidable noise in the repair request workflow and made it harder to tell whether the quote was a legitimate sales lead.

I updated the quote form and backend submission handler so phone contact details are treated as structured phone input, not as a free-form message field. The frontend now guides users before submission, and the backend now independently rejects invalid contact values before a Telegram repair request is created.

## Changes Made

### Frontend Quote Form

File: `src/components/HomePage/CalculatorComponents/SubmitQuote/SubmitQuoteTelegram.vue`

- Converted the repair request button and phone input into a real form submission flow.
- Added phone-specific browser hints: telephone input type, telephone keyboard mode, autocomplete support, and a maximum field length.
- Added input cleanup so letters and unsupported punctuation cannot remain in the phone field during normal use.
- Added user-facing validation messages when the phone value is empty or not phone-like.
- Sends the normalized phone value to the backend so spacing is consistent in Telegram notifications.
- Shows backend validation messages for expected customer input issues instead of describing those as system outages.

### Frontend Validation Helper

File: `src/utils/phoneValidation.js`

- Added a reusable phone validation helper for the browser.
- Allows Australian local phone formats, Australian `+61` formats, and standard international numbers that start with `+`.
- Allows normal phone formatting such as spaces, brackets, and dashes.
- Rejects obvious misuse such as text, links, emails, unsupported punctuation, very short values, overly long values, malformed local numbers, and all-repeated fake numbers such as `0000000000`.

### Backend Validation

Files: `functions/index.js`, `functions/phoneValidation.js`

- Added server-side phone validation before Telegram messages are sent.
- Normalizes accepted phone values before including them in the repair notification.
- Rejects direct backend requests that put free-form text into the phone field, even if someone bypasses the website form.
- Restricts submitted iPhone models and repair services to the options the website actually offers.
- Deduplicates submitted services so a manipulated request cannot repeat the same service many times.
- Caps malformed or excessive price values before they appear in the notification.

### Test Coverage

Files: `functions/phoneValidation.test.js`, `functions/package.json`

- Added backend unit tests for common valid phone formats.
- Added tests for empty values, prose, links, emails, unsupported punctuation, impossible digit counts, and all-repeated fake numbers.
- Added a `npm test` script inside the Firebase functions package.

### Development Tooling

File: `eslint.config.js`

- Updated the lint configuration so Firebase Functions files are checked as Node/CommonJS files instead of browser files.
- This keeps backend validation files covered by the normal repo lint command without producing false errors for Node-specific code.

## Why These Changes Were Made

Frontend validation improves the customer experience. It catches mistakes immediately and makes it clear that the field is for a phone number only.

Backend validation protects the business workflow. Frontend checks can be bypassed by browser tools, scripts, or direct HTTP requests, so the backend must be the final authority on what gets accepted. This is the control that prevents the same misuse from reaching Telegram again.

The backend now also validates the selected model and services because those values are part of the same repair request. The website only lets customers choose from a fixed list, so the backend should expect the same fixed list.

## Expected Impact

- Fewer junk repair submissions reaching Telegram.
- Clearer customer feedback when someone enters an invalid contact value.
- Lower chance that staff time is spent reviewing fake or unusable quote requests.
- Better separation between legitimate customer mistakes and actual quote system failures.

## Current Limitations

- This does not verify that a phone number belongs to the customer. It only checks that the value looks like a real phone number.
- This does not add rate limiting. A determined person could still submit many valid-looking phone numbers.
- This does not add CAPTCHA or bot protection. Those controls need a product decision because they add friction for legitimate customers.
- The frontend still contains a public API key-style header. Because frontend code is visible to visitors, this should not be treated as a real secret.

## Recommended Future Improvements

- Add Firebase App Check or reCAPTCHA Enterprise to reduce automated submissions. Reason: this would protect against bots, not just invalid phone field content.
- Add server-side rate limiting by IP address and time window. Reason: this would reduce repeated nuisance submissions with valid-looking numbers.
- Move away from relying on a public frontend header as a security control. Reason: anything shipped to the browser can be copied.
- Consider optional SMS verification before creating high-priority repair requests. Reason: it would prove the customer can receive messages at the number they provided, although it may reduce conversion.
- Add structured logging for rejected requests without storing abusive message content. Reason: it would help measure whether the new controls are working while avoiding unnecessary retention of customer-submitted junk.
- Share one validation package between frontend and backend. Reason: the current frontend and backend validators intentionally match, but a shared package would reduce future maintenance drift.
