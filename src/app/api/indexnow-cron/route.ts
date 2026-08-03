import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 安全校验：只允许 Vercel Cron 或带正确密钥的请求
  const auth = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Vercel Cron 自带的 user-agent 是 "vercel-cron/1.0"
  const isVercelCron = request.headers.get('user-agent')?.includes('vercel-cron');

  if (!isVercelCron && auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 拉取 sitemap
    const sitemapRes = await fetch('https://agentdev.starchentech.com/sitemap.xml');
    const xml = await sitemapRes.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]);

    if (!urls.length) {
      return NextResponse.json({ error: 'No URLs found' }, { status: 400 });
    }

    // 提交到 IndexNow
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'agentdev.starchentech.com',
        key: '3dbc518bee394159a871fe270671dbd4',
        keyLocation: 'https://agentdev.starchentech.com/3dbc518bee394159a871fe270671dbd4.txt',
        urlList: urls.slice(0, 10000),
      }),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submitted: urls.length,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
