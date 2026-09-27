import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateRepairPrice, getAvailableRepairServices } from '../src/utils/pricing.js'

const housingOnlyModels = [
  '11', '11 Pro', '11 Pro Max',
  '12', '12 Mini', '12 Pro', '12 Pro Max',
  '13', '13 Mini', '13 Pro', '13 Pro Max',
  '14 Pro', '14 Pro Max',
]
const backGlassModels = ['14', '14 Plus', '15', '15 Plus', '15 Pro', '15 Pro Max']

function price(model, services, isPremium = false) {
  return calculateRepairPrice({
    model, services, selectedServices: services.map(() => true), isPremium,
  })
}

test('every supported model has $80 budget and $100 premium batteries', () => {
  for (const model of [...housingOnlyModels, ...backGlassModels]) {
    assert.equal(price(model, ['battery']), 80, model)
    assert.equal(price(model, ['battery'], true), 100, model)
  }
})

test('11–13 series and 14 Pro models offer $150 housing without glass-only repairs', () => {
  for (const model of housingOnlyModels) {
    assert.deepEqual(getAvailableRepairServices(model), ['screen', 'battery', 'housing', 'charge port'])
    assert.equal(price(model, ['housing']), 150, model)
    assert.equal(price(model, ['housing'], true), 150, model)
    assert.equal(price(model, ['back glass']), 0, 'Unavailable repairs must not be charged')
  }
})

test('14, 14 Plus and the 15 series offer glass tiers and fixed-price housing', () => {
  for (const model of backGlassModels) {
    assert.deepEqual(getAvailableRepairServices(model), ['screen', 'battery', 'back glass', 'housing', 'charge port'])
    assert.equal(price(model, ['back glass']), 70, model)
    assert.equal(price(model, ['back glass'], true), 90, model)
    assert.equal(price(model, ['housing']), 120, model)
    assert.equal(price(model, ['housing'], true), 120, model)
  }
  assert.equal(price('iPhone 15 Pro Max', ['housing']), 120)
  assert.equal(price('iPhone 14 Pro Max', ['housing']), 150)
})

test('existing housing bundle discounts and premium price floor are preserved', () => {
  assert.equal(price('13', ['screen', 'housing']), 210)
  assert.equal(price('13', ['housing', 'charge port']), 200)
  assert.equal(price('13', ['screen', 'housing', 'battery']), 260)
  assert.equal(price('13', ['screen', 'housing', 'battery'], true), 320)
  assert.equal(price('15', ['screen', 'housing']), 180)
  assert.equal(price('15', ['screen', 'charge port'], true), 250)
  assert.equal(price('15', ['screen', 'back glass']), 150)
  assert.equal(price('15', ['back glass', 'charge port']), 190)
})

test('quotes cannot double-charge glass and housing or duplicate services', () => {
  assert.equal(price('15', ['back glass', 'housing']), 120)
  assert.equal(price('15', ['battery', 'battery'], true), 100)
  assert.equal(price('', ['battery']), 0)
  assert.equal(price('15', []), 0)
})
