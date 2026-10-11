# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে।

**BazarDor** is a Bengali-first market price tracker. It shows today's prices of everyday essentials (rice, lentils, oil, vegetables, fish, meat, dairy, spices), how much they moved since yesterday, and a market-by-market price breakdown across Bangladesh's divisions.

🔗 **Live:** `<add your Vercel link here>`
📦 **Repo:** `<add your GitHub link here>`

---

## ✨ Key Features

1. **Live price ticker** – an infinitely scrolling marquee of every product with emoji, price per unit and ▲/▼ change %.
2. **Daily risers & fallers** – the top 6 products whose price went up and the top 6 whose price went down today.
3. **Category browsing with sorting** – category pages with a "সাজান" dropdown (default / low→high / high→low) that sorts by *numeric* value, even for Bengali numerals, plus skeleton loaders and a friendly empty state.
4. **Market-wise price details** – protected product page with min / max / average price and a per-bazar, per-division price range for each product.
5. **Authentication with BetterAuth** – email & password, Google and GitHub sign-in, toast notifications, protected routes and a profile page where users can update their name.
6. **Bengali everywhere** – Bengali digits, Bengali date, unit labels (প্রতি কেজি / লিটার / ডজন / পিস).
7. **Fully responsive** – mobile, tablet and desktop layouts, plus a custom 404 page.
8. **Resilient data layer** – the API client automatically falls back to the alternative API URLs if the main one fails.

## 🛠️ Technologies Used

| Purpose | Tech |
| --- | --- |
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Authentication | BetterAuth (email/password, Google, GitHub) |
| Database (auth data) | MongoDB Atlas |
| Notifications | react-hot-toast |
| Font | Hind Siliguri (Bengali) |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your env file and fill in the values
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

See [`.env.example`](./.env.example). You need:

- `BETTER_AUTH_SECRET` – any long random string (`openssl rand -base64 32`)
- `BETTER_AUTH_URL` – `http://localhost:3000` locally, your Vercel URL in production
- `MONGODB_URI` / `MONGODB_DB` – a free MongoDB Atlas cluster
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` – redirect URI: `{BETTER_AUTH_URL}/api/auth/callback/google`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` – callback URL: `{BETTER_AUTH_URL}/api/auth/callback/github`

### Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add all the environment variables above (set `BETTER_AUTH_URL` to your Vercel domain).
3. In MongoDB Atlas → Network Access, allow `0.0.0.0/0` so Vercel can connect.
4. Add your Vercel domain to the Google / GitHub OAuth app callback URLs.
5. Redeploy. Dynamic routes (`/product/[slug]`, `/category/[slug]`) work on refresh out of the box.

## 🔌 API

Data comes from `https://openapi.programming-hero.com/api/bazardor` (`/products`, `/products?category=chal`, `/products/1`, `/categories`, `/categories/chal`).

## 📁 Project Structure

```
app/            routes (home, category, product, signin, signup, profile, API routes)
components/     Navbar, PriceTicker, Hero, ProductCard, forms, …
lib/            API client, Bengali helpers, BetterAuth server/client
middleware.ts   protects /product/* and /profile/*
```

## 👤 Author

Built by `<your name>` as part of the Programming Hero assignment.
