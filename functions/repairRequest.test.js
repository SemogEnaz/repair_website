const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const { formatRepairRequest } = require('./repairRequest');

const details = { model: '15', services: ['battery'], phone: '0400 000 000', price: 100 };

test('Telegram messages distinguish Budget, Premium and legacy enquiries', () => {
  assert.match(formatRepairRequest({ ...details, isPremium: true }), /Parts quality: Premium/);
  assert.match(formatRepairRequest({ ...details, isPremium: false }), /Parts quality: Budget/);
  assert.match(formatRepairRequest(details), /Not specified — confirm with customer/);
  assert.match(formatRepairRequest({ ...details, services: ['housing'], isPremium: true }), /Not applicable/);
});

function mockFunction() {
  const sent = [];
  const context = {
    exports: {}, console,
    process: { env: { BOT_TOKEN: 'test-bot', CHAT_ID: 'test-chat', FUNCTION_SECRET: 'test-key' } },
    require(name) {
      if (name === 'firebase-functions/v2/https') return { onRequest: (_options, handler) => handler };
      if (name === 'dotenv') return { config() {} };
      return require(name);
    },
    async fetch(_url, options) {
      sent.push(JSON.parse(options.body));
      return { ok: true, async text() { return JSON.stringify({ ok: true }); } };
    },
  };
  vm.runInNewContext(readFileSync(join(__dirname, 'index.js'), 'utf8'), context);
  return { handler: context.exports.sendRepairRequest, sent };
}

async function request(handler, body) {
  const response = {
    statusCode: 200, body: null,
    set() {}, status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
  await handler({ method: 'POST', headers: { origin: 'https://iphonerepairclayton.com', 'x-api-key': 'test-key' }, body }, response);
  return response;
}

test('repair endpoint preserves Premium through validation and the Telegram handoff without network calls', async () => {
  const { handler, sent } = mockFunction();
  const response = await request(handler, { ...details, isPremium: true });
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.success, true);
  assert.equal(sent.length, 1);
  assert.match(sent[0].text, /Parts quality: Premium/);
  assert.match(sent[0].text, /Estimate: \$100\.00 AUD/);
});

test('repair endpoint rejects malformed quality before sending a notification', async () => {
  const { handler, sent } = mockFunction();
  const response = await request(handler, { ...details, isPremium: 'false' });
  assert.equal(response.statusCode, 400);
  assert.equal(sent.length, 0);
});
