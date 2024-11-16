# Jérôme Bezeau Portfolio

Digital portfolio of Jérôme Bezeau, Art Director. This website showcases his work and expertise through an interactive and immersive experience.

## 🎨 About

This portfolio was designed by Jérôme Bezeau and developed to offer a unique user experience, highlighting his art direction work through fluid animations and modern design.

## 🚀 Technologies

The site is built with a modern web technology stack:

- **Node.js 21** - JavaScript Runtime
- **Next.js 14** - React Framework with Pages Router
- **Sanity** - Headless CMS for content management
- **TypeScript** - Static typing for enhanced robustness
- **GSAP** - High-performance animations
- **Framer Motion** - React component animations
- **Tailwind CSS** - Utility-first and responsive styling
- **SCSS** - Advanced custom styling
- **Lenis** - Smooth scroll
- **React Query** - State management and caching

## 💻 Prerequisites

- Node.js (v21.x)
- npm or yarn
- A Sanity.io account for CMS

## 📦 Available Scripts

- `yarn run dev` - Starts the development server
- `yarn run build` - Creates a production build
- `yarn run lint` - Checks code with ESLint
- `yarn run format` - Formats code with ESLint and Prettier
- `yarn run check` - Verifies code quality

## 🌐 Project Structure

```bash
jerome-bezeau/
├── components/     # Reusable React components (ui/, common/)
├── hooks/          # Custom React hooks for shared logic
├── layouts/        # Layout components
├── pages/          # Next.js routes (Page Router)
├── providers/      # Context Providers (language, gsap, smooth-scroll...)
├── public/         # Static assets (fonts, images, icons)
├── sanity/         # Sanity CMS configuration & schemas
├── services/       # API & external services integrations
├── styles/         # Global styles (SCSS, Tailwind)
├── types/          # TypeScript type definitions
└── utils/          # Utility functions (.utils.ts)
```