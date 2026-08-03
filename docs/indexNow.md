Next.js 实现IndexNow 的话，推荐走**自动化提交**，别手动一条条发。下面给你三个按优先级排序的方案，直接复制代码就能用。

---

## 0. 先验证密钥文件

浏览器打开确认正常返回纯文本密钥：

```
https://agentdev.starchentech.com/3dbc518bee394159a871fe270671dbd4.txt
```

---

## 方案一：构建后自动提交（最省心，推荐）

每次 `next build` 完成后，自动读取 sitemap 并推送给 IndexNow。

### 1. 创建提交脚本

```javascript
// scripts/indexnow-submit.mjs
import { readFileSync } from 'fs';

const KEY = '3dbc518bee394159a871fe270671dbd4';
const HOST = 'agentdev.starchentech.com';

// 从 sitemap.xml 提取 URL（无需安装额外依赖）
function getUrls() {
  try {
    const xml = readFileSync('./public/sitemap.xml', 'utf-8');
    const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
    return [...matches].map(m => m[1]).filter(u => u.startsWith('https://'));
  } catch {
    console.log('⚠️ sitemap.xml not found, skipping IndexNow');
    return [];
  }
}

async function submit() {
  const urls = getUrls();
  if (!urls.length) return;

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls.slice(0, 10000), // 单次上限 1万条
    }),
  });

  console.log(`IndexNow: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text();
    console.error('Detail:', text);
    process.exit(1);
  }
}

submit();
```

### 2. 加到构建流程

如果你用了 `next-sitemap`，确保它在 `postbuild` 里先生成 sitemap，再提交：

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap && node scripts/indexnow-submit.mjs"
  }
}
```

> 没装 `next-sitemap` 的话，先装一个：`npm i next-sitemap`，配置很简单。

---

## 方案二：Vercel 定时任务（每周自动全量刷一遍）

如果你部署在 **Vercel**，可以用内置 Cron Job，每周自动读一遍 sitemap 提交。

### 1. 配置 `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/indexnow-cron",
      "schedule": "0 3 * * 1"
    }
  ]
}
```

### 2. 创建 Cron 接口

```typescript
// app/api/indexnow-cron/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 验证 Vercel Cron 密钥（在 Vercel 后台设置 CRON_SECRET 环境变量）
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 拉取自己的 sitemap
  const sitemapRes = await fetch('https://agentdev.starchentech.com/sitemap.xml');
  const xml = await sitemapRes.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

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
    status: res.status,
    submitted: urls.length,
  });
}
```

---

## 总结：怎么选？

| 场景 | 用哪个方案                     |
|------|---------------------------|
| 主要是静态页面，每次发版更新 | **方案一**（`postbuild` 自动提交） |
| 部署在 Vercel，想定期兜底 | **方案二**（Vercel Cron）      |

几种方案**可以叠加用**，不冲突。