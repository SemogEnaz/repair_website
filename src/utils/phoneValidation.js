export const PHONE_REQUIRED_MESSAGE =
  'Please enter a phone number so I can contact you for further details. Thank you!';

export const PHONE_INVALID_MESSAGE =
  'Please enter a real phone number using digits only. Spaces, brackets, dashes and +61 are okay.';

const MAX_PHONE_LENGTH = 32;
const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15;
const ALLOWED_PHONE_CHARACTERS = /^[+\d() -]+$/;
const TEXT_OR_LINK_PATTERN = /[A-Za-z]|https?:\/\/|www\.|@/i;
const AU_LOCAL_PHONE_PATTERN = /^0[23478]\d{8}$/;
const AU_COUNTRY_PHONE_PATTERN = /^61[23478]\d{8}$/;
const INTERNATIONAL_PHONE_PATTERN = /^[1-9]\d{7,14}$/;

export function sanitizePhoneInput(value) {
  let phone = String(value ?? '').replace(/[^\d+() -]/g, '');

  const plusIndex = phone.indexOf('+');

  if (plusIndex > 0) {
    phone = phone.replace(/\+/g, '');
  } else if (plusIndex === 0) {
    phone = `+${phone.slice(1).replace(/\+/g, '')}`;
  }

  return phone.replace(/\s+/g, ' ').slice(0, MAX_PHONE_LENGTH);
}

export function normalizePhoneNumber(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

function hasValidPhoneShape(phone, digits) {
  return (
    AU_LOCAL_PHONE_PATTERN.test(digits) ||
    AU_COUNTRY_PHONE_PATTERN.test(digits) ||
    (phone.startsWith('+') && INTERNATIONAL_PHONE_PATTERN.test(digits))
  );
}

export function validatePhoneNumber(value) {
  const phone = normalizePhoneNumber(value);
  const digits = phone.replace(/\D/g, '');

  if (!phone) {
    return {
      isValid: false,
      message: PHONE_REQUIRED_MESSAGE,
    };
  }

  if (
    phone.length > MAX_PHONE_LENGTH ||
    TEXT_OR_LINK_PATTERN.test(phone) ||
    !ALLOWED_PHONE_CHARACTERS.test(phone) ||
    (phone.includes('+') && !phone.startsWith('+')) ||
    digits.length < MIN_PHONE_DIGITS ||
    digits.length > MAX_PHONE_DIGITS ||
    !hasValidPhoneShape(phone, digits) ||
    /^(\d)\1+$/.test(digits)
  ) {
    return {
      isValid: false,
      message: PHONE_INVALID_MESSAGE,
    };
  }

  return {
    isValid: true,
    message: '',
    phone,
    digits,
  };
}
