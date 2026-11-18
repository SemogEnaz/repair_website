import assert from 'node:assert/strict'
import { pages } from '../src/utils/seo.js'
import { business } from '../src/data/business.js'

// Fetch raw HTML: a browser rendering the right page after JavaScript is not enough.
const base = process.argv[2] || business.url
let failures = 0
for (const page of pages) {
  for (const path of page.path === '/' ? ['/'] : [page.path, `${page.path}/`]) {
    try {
      const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) })
      assert.equal(response.status, 200, `HTTP ${response.status}`)
      const html = await response.text()
      assert.ok(html.includes(`data-prerendered="${page.path}"`), 'Wrong prerendered page (possibly the home fallback)')
      assert.ok(html.includes(`<title>${page.title}</title>`), 'Wrong initial title')
      assert.ok(html.includes(`rel="canonical" href="${business.url}${page.path}"`), 'Wrong initial canonical URL')
      console.log(`PASS ${path}`)
    } catch (error) {
      failures++
      console.error(`FAIL ${path}: ${error.message}`)
    }
  }
}
for (const path of ['/sitemap.xml', '/robots.txt']) {
  try {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) })
    assert.equal(response.status, 200)
    const body = await response.text()
    assert.ok(body.includes(path.endsWith('.xml') ? '<urlset' : 'Sitemap:'), 'Expected file was replaced by HTML')
    console.log(`PASS ${path}`)
  } catch (error) {
    failures++
    console.error(`FAIL ${path}: ${error.message}`)
  }
}
process.exitCode = failures ? 1 : 0
