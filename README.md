# 影迹票根 H5

移动端优先的电影票根收藏工具 MVP。用户可以选择电影、填写观影信息、选择票根模板、生成电子票根，并保存到本地收藏。

## 本地运行

```bash
npm install
npm run dev
```

## Supabase 数据库

1. 在 Supabase 新建项目。
2. 复制 `.env.example` 为 `.env.local`，填入 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`。
3. 在 Supabase SQL Editor 中依次执行：
   - `supabase/migrations/202605240001_init.sql`
   - `supabase/seed.sql`
4. 在 Auth 设置中打开 Email 登录，并把本地回调地址加入 Redirect URLs：`http://localhost:3000/auth/confirm`。

## 发布检查

```bash
npm run lint
npm run typecheck
npm run build
```

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- localStorage
- html-to-image
