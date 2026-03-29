# MRC Digital Consulting — Website

Built with **Vite + React** and **Sanity CMS** for the blog.

---

## Project Structure

```
mrc-digital/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── src/
│   ├── main.jsx          # App entry + React Router
│   ├── App.jsx           # Home page
│   ├── sanityClient.js   # Sanity config
│   ├── components/
│   │   ├── Nav.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── BlogIndex.jsx
│   │   ├── BlogPost.jsx
│   │   └── blog.css
│   └── styles/
│       ├── global.css
│       └── home.css
└── studio/
    └── schemas/
        ├── post.js
        └── category.js
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Sanity

First, create a free Sanity project at https://sanity.io

```bash
npm create sanity@latest -- --template clean --create-project "MRC Blog" --dataset production
```

Copy your **Project ID** from the Sanity dashboard.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Sanity project ID:

```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

### 4. Add your schemas to Sanity Studio

Copy the files from `studio/schemas/` into your Sanity project's `schemas/` folder, then register them in your `sanity.config.js`:

```js
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import post from './schemas/post'
import category from './schemas/category'

export default defineConfig({
  name: 'mrc-blog',
  title: 'MRC Blog',
  projectId: 'your_project_id',
  dataset: 'production',
  plugins: [deskTool()],
  schema: { types: [post, category] }
})
```

### 5. Run the dev server

```bash
npm run dev
```

---

## Writing Blog Posts

1. Go to your Sanity Studio (usually at http://localhost:3333)
2. Click **Blog Post → Create**
3. Fill in title, slug, excerpt, categories, and body
4. Publish — it will appear on `/blog` automatically

---

## Deployment

**Frontend → Netlify or Vercel**
- Connect your GitHub repo
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add your `VITE_SANITY_PROJECT_ID` env variable in the dashboard

**Sanity Studio → Sanity Manage**
```bash
npx sanity deploy
```

---

## Customization Checklist

- [ ] Update email in `App.jsx` contact section
- [ ] Update availability note in `App.jsx`
- [ ] Add second portfolio project when ready
- [ ] Add your real photo to the About section
- [ ] Connect contact form to Formspree or EmailJS
