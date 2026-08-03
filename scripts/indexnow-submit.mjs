// scripts/indexnow-submit.mjs
// After `next build`, automatically read sitemap and submit URLs to IndexNow.
// Usage: node scripts/indexnow-submit.mjs

const KEY = '3dbc518bee394159a871fe270671dbd4';
const HOST = 'agentdev.starchentech.com';

/**
 * Fetch the dynamic sitemap from the Next.js dev/production server.
 * Falls back to parsing static `public/sitemap.xml` if it exists.
 */
async function getUrls() {
  // 1. Try fetching the live sitemap (works for both local and deployed)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${HOST}`;
  let xml = '';

  try {
    const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
    if (sitemapRes.ok) {
      xml = await sitemapRes.text();
      console.log(`✅ Fetched sitemap from ${baseUrl}/sitemap.xml`);
    }
  } catch {
    console.log('⚠️  Could not fetch live sitemap, trying static file...');
  }

  // 2. Fallback to local sitemap if fetched empty
  if (!xml) {
    try {
      const fs = await import('fs');
      xml = fs.readFileSync('./public/sitemap.xml', 'utf-8');
      console.log('✅ Read staticsitemap.xml');
    } catch {
      console.log('⚠️  No sitemap found, aborting IndexNow submission');
      return [];
    }
  }

  // Parse <loc> URLs
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return [...matches].map((m) => m[1]).filter((u) => u.startsWith('https://'));
}

async function submit() {
  const urls = await getUrls();
  if (!urls.length) return;

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls.slice(0, 10000), // Max 10k per request
    }),
  });

  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text();
    console.error('Detail:', text);
    process.exit(1);
  }
  console.log('✅ IndexNow submitted successfully');
}

submit();
