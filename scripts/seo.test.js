import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { pages, pageForPath, renderHead } from '../src/utils/seo.js'
import { business } from '../src/data/business.js'

const htmlFor = (page) =>
	readFile(page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`, 'utf8')

test('built pages expose unique metadata, visible content and consistent local schema without JavaScript', async () => {
	const titles = new Set()
	const descriptions = new Set()
	for (const page of pages) {
		const html = await htmlFor(page)
		assert.match(html, /<html lang="en-AU">/)
		assert.equal((html.match(/<title>/g) || []).length, 1, page.path)
		assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page.path} has one main heading`)
		assert.equal((html.match(/<main\b/g) || []).length, 1, page.path)
		assert.equal((html.match(/rel="canonical"/g) || []).length, 1, page.path)
		assert.ok(html.includes(`rel="canonical" href="${business.url}${page.path}"`), page.path)
		assert.ok(html.includes('data-prerendered'), page.path)
		assert.ok(!html.includes('<!--seo-head-->'), page.path)
		const title = html.match(/<title>(.*?)<\/title>/)[1]
		const description = html.match(/name="description" content="([^"]+)"/)[1]
		assert.ok(!titles.has(title), `Duplicate title on ${page.path}`)
		assert.ok(!descriptions.has(description), `Duplicate description on ${page.path}`)
		titles.add(title)
		descriptions.add(description)
		const schema = JSON.parse(
			html.match(
				/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s,
			)[1],
		)
		const local = schema['@graph'].find((item) => item['@type'] === 'LocalBusiness')
		assert.equal(local.telephone, business.phone)
		assert.equal(local.address.postalCode, '3168')
		assert.ok(!local.aggregateRating, 'Do not add self-serving review rich-result markup')
		const body = html.split('<body>')[1]
		assert.ok(body.includes('By appointment') || body.includes('by appointment'), page.path)
		if (page.key) assert.ok(body.includes(page.heading), page.path)
		for (const [, href] of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
			if (href.startsWith('/assets/') || href === '/Logo.png') {
				await access(`dist${href}`)
			} else {
				assert.ok(
					pages.some((item) => item.path === href),
					`Broken internal link ${href} on ${page.path}`,
				)
			}
		}
	}
	const about = await htmlFor({ path: '/about' })
	assert.match(
		about,
		/<link rel="stylesheet" href="\/assets\/AboutView-[^"]+\.css">/,
		'Route CSS is available before hydration',
	)
})

test('sitemap lists exactly the real, indexable routes', async () => {
	const xml = await readFile('dist/sitemap.xml', 'utf8')
	const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
	assert.deepEqual(urls.sort(), pages.map((page) => business.url + page.path).sort())
	assert.ok(!xml.includes('/calculator'))
	assert.ok(!xml.includes('/404'))
	assert.ok(!xml.includes('<lastmod>'), 'Do not invent content modification dates')
	assert.match(
		await readFile('dist/robots.txt', 'utf8'),
		/Sitemap: https:\/\/iphonerepairclayton\.com\/sitemap\.xml/,
	)
})

test('unknown routes are noindex, with no canonical or local-business markup', async () => {
	const html = await readFile('dist/404.html', 'utf8')
	assert.match(html, /name="robots" content="noindex, follow"/)
	assert.ok(!html.includes('rel="canonical"'))
	assert.ok(!html.includes('id="structured-data"'))
	assert.match(html, /Page not found/)
	assert.equal(pageForPath('/does-not-exist').noindex, true)
	assert.equal(pageForPath('/contact/?utm_source=google#details').path, '/contact')
})

test('metadata escapes markup and JSON-LD cannot terminate its script', () => {
	const head = renderHead({
		path: '/',
		title: '</title><script>alert(1)</script>',
		description: '" onload="bad',
		label: 'Home',
	})
	assert.ok(!head.includes('<script>alert(1)</script>'))
	assert.ok(head.includes('&lt;/title&gt;'))
	assert.ok(!head.includes('content="" onload='))
})

test('price page never advertises unavailable back-glass repairs as free and shows both battery options', async () => {
	const html = await htmlFor({ path: '/repair-prices' })
	const table = html.split('<tbody>')[1].split('</tbody>')[0]
	assert.ok(!table.includes('$0'), 'Public price table must not quote an unavailable repair at zero')
	assert.match(table, /iPhone back glass repair[\s\S]*?\$100/)
	assert.match(table, /iPhone battery replacement[\s\S]*?\$80–\$90 budget \/ \$100–\$150 premium/)
	assert.ok(table.includes('iPhone housing replacement'))
	assert.ok(table.includes('$120–$250'))
})

test('home page presents the calculator before contact and replaces the empty zero estimate with guidance', async () => {
	const html = await htmlFor({ path: '/' })
	assert.ok(html.indexOf('id="quote"') < html.indexOf('id="contactLinks"'))
	assert.ok(html.includes('Select your model and repair to see an estimate.'))
	assert.ok(!html.includes('Time: 0 mins'))
	assert.ok(html.includes('12-month repair warranty'))
})

test('generated Render rules point every clean URL at its own prerendered document', async () => {
	const routes = JSON.parse(await readFile('dist/render-routes.json', 'utf8'))
	for (const page of pages.filter((item) => item.path !== '/')) {
		for (const source of [page.path, `${page.path}/`]) {
			const rule = routes.find((item) => item.source === source)
			assert.equal(rule?.type, 'rewrite', source)
			const html = await readFile(`dist${rule.destination}`, 'utf8')
			assert.ok(html.includes(`data-prerendered="${page.path}"`), source)
			assert.ok(html.includes(`rel="canonical" href="${business.url}${page.path}"`), source)
		}
	}
})
