
Vercel 的 Cron 是**配置在代码里**的，写在项目根目录的 `vercel.json` 文件中，提交代码后自动生效。Dashboard 里只能**查看执行记录**，不能创建或修改定时任务。

---

## 完整操作流程（从零开始）

### 第 1 步：创建 API 路由

这个路由就是定时任务实际执行的代码，Vercel 会定期向它发送 GET 请求。

```typescript
// app/api/indexnow-cron/route.ts
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
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

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
```

### 第 2 步：创建 vercel.json

在项目**根目录**（和 `package.json` 同级）创建这个文件：

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

- `path`：刚才创建的 API 路由路径，必须以 `/` 开头
- `schedule`：Cron 表达式，这里是**每周一凌晨 3 点 UTC** 执行一次

> 常用表达式：
> - `0 3 * * *` = 每天凌晨 3 点 UTC
> - `0 3 * * 1` = 每周一凌晨 3 点 UTC
> - `0 */6 * * *` = 每 6 小时执行一次（Pro 计划才支持）

### 第 3 步：设置环境变量（可选但强烈建议）

在 Vercel Dashboard 里设置，防止别人直接访问你的 cron 接口：

1. 打开 [vercel.com](https://vercel.com) → 你的项目 → **Settings** → **Environment Variables**
2. 添加：
    - **Key**: `CRON_SECRET`
    - **Value**: 随便生成一个长字符串（比如 `sk-cron-xxxxxxxx`）
3. 保存后重新部署

本地开发时，在 `.env.local` 里也加上：
```
CRON_SECRET=sk-cron-xxxxxxxx
```

### 第 4 步：提交并部署

```bash
git add .
git commit -m "Add IndexNow cron job"
git push
```

Vercel 会自动检测到 `vercel.json` 的变化，部署完成后 cron 就生效了。

---

## 在 Dashboard 里查看

1. 打开 [vercel.com](https://vercel.com) → 你的项目
2. 点击顶部 **Deployments** 标签
3. 找到最新的部署，点进去
4. 在左侧菜单找到 **Cron Jobs**，可以看到：
    - 定时任务列表
    - 下次执行时间
    - 历史执行记录和日志

> ⚠️ **Dashboard 里只能看，不能改**。要修改 schedule 或增删任务，必须修改 `vercel.json` 重新部署。

---

## ⚠️ 免费版（Hobby）限制

| 限制项 | Hobby 免费版 | Pro 付费版 |
|--------|-------------|-----------|
| Cron 任务数 | 最多 100 个 | 最多 100 个 |
| 执行频率 | **每天最多 1 次** | 每分钟都可以 |
| 时间精度 | 大约 1 小时内触发 | 精确到分钟 |
| 时区 | 只能 UTC | 只能 UTC |

所以如果你用的是免费版：
- `0 3 * * 1`（每周一次）✅ 没问题
- `0 */6 * * *`（每 6 小时）❌ 会部署失败
- `0 3 * * *`（每天一次）✅ 没问题

如果 IndexNow 每周提交一次对你够用了，免费版完全 OK。如果希望每天或更频繁提交，需要升级到 Pro（$20/月）。

---

## 总结

| 问题 | 答案 |
|------|------|
| 配置在哪 | **代码里**的 `vercel.json` |
| 怎么生效 | `git push` 部署后自动生效 |
| Dashboard 能干嘛 | 只能**查看执行记录和日志** |
| 怎么修改 | 改 `vercel.json` 重新部署 |

如果你还没把项目部署到 Vercel，或者对部署流程也不熟悉，告诉我，我可以从「怎么把 Next.js 项目推到 Vercel」开始一步步讲。