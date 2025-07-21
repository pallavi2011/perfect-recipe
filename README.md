# Perfect Recipe

Perfect Recipe is a full-stack web application for discovering, sharing, and managing recipes. Built with [Next.js](https://nextjs.org), it features AI-powered nutrition calculation, image uploads, user authentication, and more.

---

## Features

- 🥗 **Recipe Creation & Sharing**: Add, edit, and share your favorite recipes.
- 📸 **Image Upload**: Upload recipe images using ImageKit.
- 🤖 **AI Nutrition Calculation**: Instantly calculate nutrition facts (calories, protein, fats, etc.) using Gemini AI.
- 🔒 **Authentication**: Secure user accounts and profiles.
- 💾 **Caching**: Fast recipe loading with Redis caching.
- 📱 **Responsive Design**: Mobile-friendly UI with Tailwind CSS.
- ⭐ **Ratings & Comments**: Engage with the community.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/perfect-recipe.git
cd perfect-recipe
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```
DATABASE_URL=your_postgres_or_mysql_url
REDIS_URL=your_redis_url
GEMINI_API_KEY=your_gemini_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `/app` - Next.js app directory (pages, API routes, components)
- `/components` - React components (UI, forms, upload, etc.)
- `/actions` - Server actions for data fetching and mutations
- `/schemas` - Zod validation schemas
- `/prisma` - Prisma schema and migrations
- `/public` - Static assets (images, icons)

---

## Key Technologies

- [Next.js 13+](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL/MySQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [ImageKit](https://imagekit.io/)
- [Google Gemini AI](https://ai.google.dev/)
- [Zod](https://zod.dev/)

---

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.  
Set all required environment variables in your deployment dashboard.

---



## Credits

Created by Pallavi Kuligod 
Inspired by the love of cooking and technology!