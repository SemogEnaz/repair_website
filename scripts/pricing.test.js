import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateRepairPrice, getAvailableRepairServices, SUPPORTED_MODELS } from '../src/utils/pricing.js'

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

test('iPhone 11 through 15 have $80 budget and $100 premium batteries', () => {
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

test('14, 14 Plus and the 15 series offer $100 back glass and fixed-price housing', () => {
  for (const model of backGlassModels) {
    assert.deepEqual(getAvailableRepairServices(model), ['screen', 'battery', 'back glass', 'housing', 'charge port'])
    assert.equal(price(model, ['back glass']), 100, model)
    assert.equal(price(model, ['back glass'], true), 100, model)
    assert.equal(price(model, ['housing']), 120, model)
    assert.equal(price(model, ['housing'], true), 120, model)
  }
  assert.equal(price('iPhone 15 Pro Max', ['housing']), 120)
  assert.equal(price('iPhone 14 Pro Max', ['housing']), 150)
})

test('iPhone 16 models offer the listed single repairs in both parts qualities', () => {
  const cases = [
    // Model, budget/premium screen, budget/premium battery, housing
    ['16e', 90, 150, 90, 120, 180],
    ['16', 90, 150, 90, 120, 200],
    ['16 Plus', 90, 150, 90, 120, 220],
    ['16 Pro', 90, 150, 90, 120, 250],
    ['16 Pro Max', 100, 180, 90, 150, 250],
  ]
  for (const [model, screen, premiumScreen, battery, premiumBattery, housing] of cases) {
    assert.ok(SUPPORTED_MODELS.includes(model), model)
    for (const [service, budget, premium] of [
      ['screen', screen, premiumScreen], ['battery', battery, premiumBattery],
      ['charge port', 120, 120], ['back glass', 100, 100], ['housing', housing, housing],
    ]) {
      assert.equal(price(model, [service]), budget, model + ' budget ' + service)
      assert.equal(price(model, [service], true), premium, model + ' premium ' + service)
    }
  }
})

test('existing housing bundle discounts and premium price floor are preserved', () => {
  assert.equal(price('13', ['screen', 'housing']), 210)
  assert.equal(price('13', ['housing', 'charge port']), 200)
  assert.equal(price('13', ['screen', 'housing', 'battery']), 260)
  assert.equal(price('13', ['screen', 'housing', 'battery'], true), 320)
  assert.equal(price('15', ['screen', 'housing']), 180)
  assert.equal(price('15', ['screen', 'charge port'], true), 250)
  assert.equal(price('15', ['screen', 'back glass']), 180)
  assert.equal(price('15', ['back glass', 'charge port']), 220)
})

test('back glass and housing cost $210 on supported iPhone 14 and 15 models', () => {
  for (const model of backGlassModels) {
    assert.equal(price(model, ['back glass', 'housing']), 210, model)
    assert.equal(price(model, ['back glass', 'housing'], true), 210, model)
    assert.equal(price(model, ['screen', 'back glass', 'housing']), 270, model)
    assert.equal(price(model, ['housing', 'back glass', 'charge port']), 260, model)
    for (const isPremium of [false, true]) {
      for (const service of ['back glass', 'housing']) {
        assert.equal(calculateRepairPrice({
          model,
          services: ['back glass', 'housing'],
          selectedServices: ['back glass', 'housing'].map((value) => value === service),
          isPremium,
        }), price(model, [service], isPremium), `${model}: only ${service} selected`)
      }
    }
  }
})

test('every available repair combination has a positive finite price in both quality tiers', () => {
  for (const model of SUPPORTED_MODELS) {
    const services = getAvailableRepairServices(model)
    for (let mask = 1; mask < 2 ** services.length; mask++) {
      const selectedServices = services.map((_, index) => Boolean(mask & (1 << index)))
      for (const isPremium of [false, true]) {
        const total = calculateRepairPrice({ model, services, selectedServices, isPremium })
        assert.ok(Number.isFinite(total) && total > 0,
          `${model}, ${services.filter((_, index) => selectedServices[index]).join(' + ')}, premium=${isPremium}: ${total}`)
      }
    }
  }
})

test('quotes cannot double-charge duplicate services and empty quotes remain zero', () => {
  assert.equal(price('15', ['back glass', 'housing', 'back glass']), 210)
  assert.equal(price('15', ['battery', 'battery'], true), 100)
  assert.equal(price('', ['battery']), 0)
  assert.equal(price('15', []), 0)
})
