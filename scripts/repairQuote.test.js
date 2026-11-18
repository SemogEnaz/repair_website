import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateRepairTime, formatRepairTime, getRepairPriceRange } from '../src/utils/pricing.js'
import { buildRepairRequest, getPartsQualityLabel, getRepairWhatsAppUrl } from '../src/utils/repairQuote.js'

function quote(services, isPremium = false, model = '15') {
  return { model, services, selectedServices: services.map(() => true), isPremium, price: 999 }
}

test('public price ranges exclude unavailable repairs and include Premium batteries', () => {
  assert.deepEqual(getRepairPriceRange('back glass'), { min: 100, max: 100 })
  assert.deepEqual(getRepairPriceRange('battery'), { min: 80, max: 80 })
  assert.deepEqual(getRepairPriceRange('battery', true), { min: 100, max: 100 })
  assert.deepEqual(getRepairPriceRange('housing'), { min: 120, max: 150 })
  assert.equal(getRepairPriceRange('unavailable'), null)
})

test('enquiries carry the chosen quality and recalculate the price instead of using stale display state', () => {
  assert.deepEqual(buildRepairRequest(quote(['battery'], true), '0400 000 000'), {
    model: '15', services: ['battery'], isPremium: true, price: 100, phone: '0400 000 000',
  })
  assert.equal(buildRepairRequest(quote(['battery']), '').price, 80)
  assert.equal(getPartsQualityLabel(quote(['battery'], true)), 'Premium')
  assert.equal(getPartsQualityLabel(quote(['screen'])), 'Budget')
  assert.equal(getPartsQualityLabel(quote(['housing'], true)), 'Not applicable')
})

test('WhatsApp includes the same repair estimate, quality and time without adding contact form data', () => {
  const details = { ...quote(['screen', 'battery'], true), phone: '0400 000 000' }
  const url = new URL(getRepairWhatsAppUrl(details))
  const message = url.searchParams.get('text')
  assert.equal(url.origin + url.pathname, 'https://wa.me/61411969004')
  for (const expected of ['iPhone 15', 'screen + battery', 'Premium', '$220 AUD', '30 mins']) {
    assert.ok(message.includes(expected), expected)
  }
  assert.ok(!message.includes(details.phone))
  assert.equal(getRepairWhatsAppUrl(quote(['screen'], false, '')), null)
  assert.equal(getRepairWhatsAppUrl(quote([])), null)
})

test('repair times agree for single repairs, overlap, unavailable services and empty selections', () => {
  assert.equal(calculateRepairTime(quote(['back glass'])), 75)
  assert.equal(formatRepairTime(75), '1 hr 15 mins')
  assert.equal(calculateRepairTime(quote(['screen', 'battery'])), 30)
  assert.equal(calculateRepairTime(quote(['housing', 'battery'])), 120)
  assert.equal(calculateRepairTime(quote(['back glass'], false, '11')), 0)
  assert.equal(calculateRepairTime(quote(['screen'], false, '')), 0)
  assert.equal(calculateRepairTime(quote([])), 0)
})
