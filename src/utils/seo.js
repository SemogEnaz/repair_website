import { business } from '../data/business.js'
import { services } from '../data/services.js'

export const pages = [
	{
		path: '/',
		title: 'iPhone Repair Clayton | Screen, Battery & Back Glass Repairs',
		description:
			'iPhone screen, battery, back glass and charging port repairs in Clayton. Compare online estimates and book at 2 Greenfield Drive. Call 0411 969 004.',
		label: 'Home',
	},
	...services,
	{
		path: '/repair-prices',
		title: 'iPhone Repair Prices Clayton | Instant Repair Estimate',
		description:
			'Compare iPhone screen, battery, back glass and charging port repair estimates in Clayton. Select your model and parts options, then request an appointment.',
		label: 'Repair prices',
	},
	{
		path: '/contact',
		title: 'Contact iPhone Repair Clayton | Phone, Hours & Directions',
		description:
			'Call or WhatsApp 0411 969 004 to book an iPhone repair. Visit 2 Greenfield Drive, Clayton VIC 3168 by appointment. Open daily, 9 am–8 pm.',
		label: 'Contact',
	},
	{
		path: '/about',
		title: 'About iPhone Repair Clayton | Local Repairs & Warranty',
		description:
			'Learn about iPhone Repair Clayton, our repair process, parts and 12-month repair warranty. Find us at 2 Greenfield Drive, Clayton, by appointment.',
		label: 'About',
	},
	{
		path: '/buy',
		title: 'Second-Hand iPhones Clayton | Buy & Trade In',
		description:
			'Browse available second-hand iPhones for pickup in Clayton. View current Marketplace listings or contact iPhone Repair Clayton about an iPhone trade-in.',
		label: 'Buy & trade in',
	},
	{
		path: '/battery',
		title: 'iPhone Battery Health Guide | iPhone Repair Clayton',
		description:
			'Understand iPhone Battery Health, common signs of battery ageing and when to consider replacement. Explore local battery repair options in Clayton.',
		label: 'Battery health guide',
	},
]
export const notFoundPage = {
	path: '/404',
	title: 'Page Not Found | iPhone Repair Clayton',
	description: 'Find iPhone repairs, prices and contact information for iPhone Repair Clayton.',
	noindex: true,
}

export function pageForPath(path) {
	const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
	return pages.find((page) => page.path === cleanPath) || notFoundPage
}

export function structuredData(page) {
	if (page.noindex) return null
	const url = business.url + page.path
	const graph = [
		{
			'@type': 'LocalBusiness',
			'@id': `${business.url}/#business`,
			name: business.name,
			url: `${business.url}/`,
			telephone: business.phone,
			description:
				'iPhone screen, battery, back glass and charging port repairs in Clayton by appointment.',
			address: {
				'@type': 'PostalAddress',
				streetAddress: business.street,
				addressLocality: business.suburb,
				addressRegion: business.region,
				postalCode: business.postcode,
				addressCountry: 'AU',
			},
			openingHoursSpecification: [
				{
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: [
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
						'Sunday',
					],
					opens: '09:00',
					closes: '20:00',
				},
			],
			hasMap: business.maps,
			sameAs: [business.googleProfile, business.facebook],
		},
		{
			'@type': 'WebSite',
			'@id': `${business.url}/#website`,
			url: `${business.url}/`,
			name: business.name,
			inLanguage: 'en-AU',
			publisher: { '@id': `${business.url}/#business` },
		},
		{
			'@type': 'WebPage',
			'@id': `${url}#webpage`,
			url,
			name: page.title,
			description: page.description,
			inLanguage: 'en-AU',
			isPartOf: { '@id': `${business.url}/#website` },
			about: { '@id': `${business.url}/#business` },
		},
	]
	if (page.path !== '/')
		graph.push({
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: `${business.url}/` },
				{ '@type': 'ListItem', position: 2, name: page.label, item: url },
			],
		})
	if (page.key)
		graph.push({
			'@type': 'Service',
			'@id': `${url}#service`,
			name: page.heading,
			serviceType: page.label,
			url,
			description: page.summary,
			provider: { '@id': `${business.url}/#business` },
			areaServed: { '@type': 'Place', name: 'Clayton, Victoria' },
		})
	return { '@context': 'https://schema.org', '@graph': graph }
}

export function escapeHtml(value) {
	return String(value).replace(
		/[&<>"']/g,
		(character) =>
			({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
	)
}

export function renderHead(page) {
	const data = structuredData(page)
	return `<title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
    ${page.noindex ? '' : `<link rel="canonical" href="${business.url}${page.path}">`}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${business.name}">
    <meta property="og:locale" content="en_AU">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${business.url}${page.path}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    ${data ? `<script id="structured-data" type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : ''}`
}

export function updateHead(path) {
	const page = pageForPath(path)
	// One owner for metadata, shared by the static build and browser navigation.
	document
		.querySelectorAll(
			'title, meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], #structured-data',
		)
		.forEach((element) => element.remove())
	document.head.insertAdjacentHTML('beforeend', renderHead(page))
}
