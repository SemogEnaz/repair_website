export function trackEvent(name, parameters = {}) {
	if (!import.meta.env.PROD || typeof window === 'undefined') return
	try {
		if (localStorage.getItem('admin-mode') === 'true') return
		window.gtag?.('event', name, parameters)
	} catch {
		// Analytics must never block a call, message or quote submission.
	}
}
export function trackContact(method) {
	trackEvent('contact_click', { contact_method: method })
}
export function trackQuoteSuccess() {
	// Customer phone numbers and other form data are never sent to analytics.
	trackEvent('generate_lead', { lead_source: 'repair_quote' })
}
