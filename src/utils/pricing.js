export const REPAIR_SERVICE = Object.freeze({
  SCREEN: 'screen',
  BATTERY: 'battery',
  BACK_GLASS: 'back glass',
  HOUSING: 'housing',
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
  [REPAIR_SERVICE.BATTERY]: Object.freeze({
    [PRICE_QUALITY.BUDGET]: 80,
    [PRICE_QUALITY.PREMIUM]: 100,
  }),
  [REPAIR_SERVICE.BACK_GLASS]: Object.freeze({
    [PRICE_QUALITY.BUDGET]: 70,
    [PRICE_QUALITY.PREMIUM]: 90,
  }),
  [REPAIR_SERVICE.HOUSING]: 150,
  [REPAIR_SERVICE.CHARGE_PORT]: 120,
})

const BACK_GLASS_MODELS = new Set(['14', '14plus', '15', '15plus', '15pro', '15promax'])

const MODEL_PRICE_OVERRIDES = Object.freeze(
  Object.fromEntries(
    [...BACK_GLASS_MODELS].map((model) => [model, { [REPAIR_SERVICE.HOUSING]: 120 }]),
  ),
)

const BUNDLE_DISCOUNTS = Object.freeze([
  {
    services: [REPAIR_SERVICE.SCREEN, REPAIR_SERVICE.HOUSING],
    amount: 20,
  },
  {
    services: [REPAIR_SERVICE.HOUSING, REPAIR_SERVICE.CHARGE_PORT],
    amount: 70,
  },
  {
    services: [
      REPAIR_SERVICE.SCREEN,
      REPAIR_SERVICE.HOUSING,
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

export function getAvailableRepairServices(model) {
  return Object.values(REPAIR_SERVICE).filter(
    (service) => service !== REPAIR_SERVICE.BACK_GLASS || BACK_GLASS_MODELS.has(normalizeModelName(model)),
  )
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

  const availableServices = new Set(getAvailableRepairServices(quote.model))
  const selected = quote.services
    .filter((_, index) => quote.selectedServices[index])
    .map(normalizeServiceName)
    .filter((service) => availableServices.has(service))

  // A full housing replacement takes precedence over a glass-only repair.
  return [...new Set(selected)].filter(
    (service) => service !== REPAIR_SERVICE.BACK_GLASS || !selected.includes(REPAIR_SERVICE.HOUSING),
  )
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
