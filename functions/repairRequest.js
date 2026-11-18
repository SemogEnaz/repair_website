// Kept independent of Firebase so message contents can be checked without sending.
function formatRepairRequest({ model, services, phone, price, isPremium }, now = new Date()) {
  const hasQualityOption = services.some((service) => service === 'screen' || service === 'battery');
  const quality = !hasQualityOption ? 'Not applicable'
    : typeof isPremium === 'boolean' ? (isPremium ? 'Premium' : 'Budget')
      : 'Not specified — confirm with customer';

  return [
    '🔧 New Repair Request',
    '',
    `📱 Model: ${model}`,
    `🛠 Services: ${services.join(', ')}`,
    `⭐ Parts quality: ${quality}`,
    `💰 Estimate: $${price.toFixed(2)} AUD`,
    '',
    `📞 Phone: ${phone}`,
    '',
    `🗓️ Date Created: ${now.toLocaleDateString('en-AU', { timeZone: 'Australia/Melbourne' })}`,
    `⏰ Time Created: ${now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Melbourne' })}`,
  ].join('\n');
}

module.exports = { formatRepairRequest };
