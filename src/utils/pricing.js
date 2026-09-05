export const REPAIR_SERVICE = Object.freeze({
  SCREEN: 'screen',
  BATTERY: 'battery',
  BACK_GLASS: 'back glass',
  CHARGE_PORT: 'charge port',
})

const PRICE_QUALITY = Object.freeze({
  BUDGET: 'budget',
  PREMIUM: 'premium',
})

const DEFAULT_REPAIR_PRICES = Object.freeze({
  [REPAIR_SERVICE.SCREEN]: Object.freeze({
    [PRICE_QUALITY.BUDGET]: 80,
    [PRICE_QUALITY.PREMIUM]: 120,
  }),
  [REPAIR_SERVICE.BATTERY]: 80,
  [REPAIR_SERVICE.BACK_GLASS]: 150,
  [REPAIR_SERVICE.CHARGE_PORT]: 120,
})

// Add future model-specific prices here using normalizeModelName(model) as the key.
// Example: '15promax': { [REPAIR_SERVICE.SCREEN]: { premium: 180 } }
const MODEL_PRICE_OVERRIDES = Object.freeze({})

const BUNDLE_DISCOUNTS = Object.freeze([
  {
    services: [REPAIR_SERVICE.SCREEN, REPAIR_SERVICE.BACK_GLASS],
    amount: 20,
  },
  {
    services: [REPAIR_SERVICE.BACK_GLASS, REPAIR_SERVICE.CHARGE_PORT],
    amount: 70,
  },
  {
    services: [
      REPAIR_SERVICE.SCREEN,
      REPAIR_SERVICE.BACK_GLASS,
      REPAIR_SERVICE.BATTERY,
    ],
    amount: 30,
  },
])

const BUNDLE_PRICE_FLOORS = Object.freeze([
  {
    services: [REPAIR_SERVICE.SCREEN, REPAIR_SERVICE.CHARGE_PORT],
    quality: PRICE_QUALITY.PREMIUM,
    price: 250,
  },
])

export function normalizeModelName(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/^iphone\s*/, '')
    .replace(/[^a-z0-9]+/g, '')
}

export function calculateRepairPrice(quote) {
  const selectedServices = getSelectedServices(quote)

  if (!quote?.model || !selectedServices.length) return 0

  const quality = quote.isPremium ? PRICE_QUALITY.PREMIUM : PRICE_QUALITY.BUDGET
  const prices = getModelRepairPrices(quote.model)
  const selectedSet = new Set(selectedServices)

  const serviceTotal = selectedServices.reduce((total, service) => {
    return total + getServicePrice(prices, service, quality)
  }, 0)

  const discountedTotal = serviceTotal - getBundleDiscount(selectedSet)
  const bundledTotal = applyBundlePriceFloors(discountedTotal, selectedSet, quality)

  return Math.max(bundledTotal, 0)
}

function getSelectedServices(quote) {
  if (!Array.isArray(quote?.services) || !Array.isArray(quote?.selectedServices)) {
    return []
  }

  return quote.services
    .filter((_, index) => quote.selectedServices[index])
    .map(normalizeServiceName)
}

function normalizeServiceName(value) {
  return String(value ?? '').trim().toLowerCase()
}

function getModelRepairPrices(model) {
  const modelKey = normalizeModelName(model)
  return mergeRepairPrices(DEFAULT_REPAIR_PRICES, MODEL_PRICE_OVERRIDES[modelKey])
}

function mergeRepairPrices(defaultPrices, overridePrices = {}) {
  const mergedPrices = { ...defaultPrices }

  Object.entries(overridePrices).forEach(([service, overridePrice]) => {
    const defaultPrice = mergedPrices[service]

    if (isObject(defaultPrice) && isObject(overridePrice)) {
      mergedPrices[service] = {
        ...defaultPrice,
        ...overridePrice,
      }
      return
    }

    mergedPrices[service] = overridePrice
  })

  return mergedPrices
}

function getServicePrice(prices, service, quality) {
  const servicePrice = prices[service]

  if (typeof servicePrice === 'number') return toValidPrice(servicePrice)

  if (isObject(servicePrice)) {
    return toValidPrice(
      servicePrice[quality] ??
        servicePrice.standard ??
        servicePrice[PRICE_QUALITY.BUDGET] ??
        servicePrice[PRICE_QUALITY.PREMIUM],
    )
  }

  return 0
}

function getBundleDiscount(selectedSet) {
  return BUNDLE_DISCOUNTS.reduce((total, rule) => {
    if (!hasAllServices(selectedSet, rule.services)) return total

    return total + rule.amount
  }, 0)
}

function applyBundlePriceFloors(total, selectedSet, quality) {
  return BUNDLE_PRICE_FLOORS.reduce((currentTotal, rule) => {
    if (!hasAllServices(selectedSet, rule.services)) return currentTotal
    if (rule.quality && rule.quality !== quality) return currentTotal

    return Math.max(currentTotal, rule.price)
  }, total)
}

function hasAllServices(selectedSet, services) {
  return services.every((service) => selectedSet.has(service))
}

function toValidPrice(value) {
  const price = Number(value)

  if (!Number.isFinite(price) || price < 0) return 0

  return price
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
