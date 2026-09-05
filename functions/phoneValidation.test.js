const assert = require("node:assert/strict");
const test = require("node:test");

const {
  PHONE_INVALID_MESSAGE,
  PHONE_REQUIRED_MESSAGE,
  validatePhoneNumber,
} = require("./phoneValidation");

test("accepts normal Australian phone number formats", () => {
  assert.equal(validatePhoneNumber("0411 969 004").isValid, true);
  assert.equal(validatePhoneNumber("+61 411 969 004").isValid, true);
  assert.equal(validatePhoneNumber("61411969004").isValid, true);
  assert.equal(validatePhoneNumber("(03) 9123 4567").isValid, true);
});

test("normalizes extra whitespace before sending", () => {
  const result = validatePhoneNumber("  0411   969   004  ");

  assert.equal(result.isValid, true);
  assert.equal(result.phone, "0411 969 004");
});

test("rejects empty phone input", () => {
  const result = validatePhoneNumber("  ");

  assert.equal(result.isValid, false);
  assert.equal(result.message, PHONE_REQUIRED_MESSAGE);
});

test("rejects prose, links, emails, and unsupported characters", () => {
  const invalidValues = [
    "I do not want to give you my number",
    "0411 969 004 please call after 6",
    "https://example.com/0411969004",
    "customer@example.com",
    "0411 969 004!!!",
  ];

  for (const value of invalidValues) {
    const result = validatePhoneNumber(value);

    assert.equal(result.isValid, false, value);
    assert.equal(result.message, PHONE_INVALID_MESSAGE);
  }
});

test("rejects impossible digit counts and all-repeated fake numbers", () => {
  const invalidValues = ["123", "12345678", "1".repeat(16), "0000000000"];

  for (const value of invalidValues) {
    assert.equal(validatePhoneNumber(value).isValid, false, value);
  }
});
