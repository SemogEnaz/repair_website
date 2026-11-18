import { business } from '../data/business.js'
import {
  REPAIR_SERVICE, calculateRepairPrice, calculateRepairTime, formatRepairTime, getSelectedServices,
} from './pricing.js'

export function getPartsQualityLabel(quote) {
  const hasQualityOption = getSelectedServices(quote).some((service) =>
    service === REPAIR_SERVICE.SCREEN || service === REPAIR_SERVICE.BATTERY,
  )
  return hasQualityOption ? (quote.isPremium ? 'Premium' : 'Budget') : 'Not applicable'
}

export function buildRepairRequest(quote, phone) {
  return {
    model: quote.model,
    services: getSelectedServices(quote),
    isPremium: Boolean(quote.isPremium),
    price: calculateRepairPrice(quote),
    phone,
  }
}

export function getRepairWhatsAppUrl(quote) {
  if (!quote?.model || !getSelectedServices(quote).length) return null
  const message = [
    `Hi Zane, I'd like to enquire about this repair:`,
    `Model: iPhone ${quote.model}`,
    `Services: ${getSelectedServices(quote).join(' + ')}`,
    `Parts quality: ${getPartsQualityLabel(quote)}`,
    `Estimate: $${calculateRepairPrice(quote)} AUD`,
    `Estimated repair time: ${formatRepairTime(calculateRepairTime(quote))}`,
    'Could you confirm the final quote, parts availability and a suitable appointment?',
  ].join('\n')
  return `https://wa.me/${business.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
