# 📘 JEE Main Dashboard

A responsive, interactive dashboard for JEE Main aspirants built using **Next.js**, **Tailwind CSS**, **shadcn/ui**, and **Redux Toolkit**. It presents subject-wise chapter data with filters, tabs, status indicators, and much more — all powered by mock JSON data.

---

## 🚀 Features

### ✅ Core Features (as per Requirements)
- **Subject Tabs**: Switch between Physics, Chemistry, and Mathematics.
- **FilterBar**:
  - **Multi-select Filters** for Class and Units (dynamically fetched per subject).
  - **Status Filter**: View only "Not Started" chapters.
  - **Weak Chapters Toggle**: Highlight weaker areas for focused study.
- **Chapter List View**:
  - Detailed stat cards (progress, completed questions, etc.)
  - **Icons from [PhosphorIcons](https://phosphoricons.com/)**, randomly assigned.
  - Green/red arrow indicators for performance trends.
- **Sorting Toggle**: Sort by chapter performance or completion.
- **Dark Mode**: Supports system-based or manual dark/light theme toggle.
- **Responsive Design**: Fully optimized for mobile and desktop screens.

### ➕ Additional Features
- **Meta Tags**: For SEO and better social previews.
- **Favicon (Tab Icon)**: Added via `public/favicon.ico`.
- **Pagination**: Data is paginated for better UX on long lists.
- **Redux Toolkit**: Centralized global state for filters and theme.
- **Custom Hooks**: `useChapters` for reusable data logic.
- **Utility Functions**: Helpers for data manipulation (`lib/utils.ts`).
- **Folder Structure Optimization**: Clean and modular file organization.

---

## 🧱 Tech Stack

| Tool/Library        | Purpose                        |
|---------------------|--------------------------------|
| Next.js (App Router) | Routing, SSR, and page layout  |
| Tailwind CSS        | Utility-first styling           |
| shadcn/ui           | UI primitives and accessibility |
| Redux Toolkit       | State management                |
| Phosphor Icons      | Chapter icons                   |

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
│   ├── dashboard/
│   │   ├── ChapterCard.tsx
│   │   ├── ChapterList.tsx
│   │   ├── FilterBar.tsx
│   │   └── SubjectTabs.tsx
│   ├── layout/
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       └── toggle.tsx
├── data/
│   └── mockData.ts
├── hooks/
│   └── useChapters.ts
├── lib/
│   └── utils.ts
├── store/
│   ├── slices/
│   ├── index.ts
│   └── types/
```

---

## 🔧 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/jee-main-dashboard.git
   cd jee-main-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Meta Tags

Set in `app/layout.tsx` using `<Head>` from `next/head`:
```tsx
<Head>
  <title>JEE Main Dashboard</title>
  <meta name="description" content="Track and analyze your JEE chapter-wise progress for Physics, Chemistry, and Math." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</Head>
```

---

## 📊 Pagination

Implemented in `ChapterList.tsx` using `useState` + `slice()` to:
- Show 6 chapters per page
- Navigate using page numbers or next/prev

---

## 🌑 Dark Mode

Enabled using [`next-themes`](https://github.com/pacocoursey/next-themes) and shadcn toggle switch:
```tsx
import { useTheme } from 'next-themes';
const { theme, setTheme } = useTheme();
```

---

## 📈 Filtering Logic

- Filters and toggles dispatch actions to Redux store.
- Selectors compute filtered chapter list.
- Weak chapters identified based on custom logic (e.g., low completion percentage).

---

## 📦 Dependencies (partial)

```json
{
  "next": "14.x",
  "react": "18.x",
  "tailwindcss": "^3.x",
  "redux": "^4.x",
  "@reduxjs/toolkit": "^1.x",
  "phosphor-react": "^2.x",
  "next-themes": "^0.x",
  "shadcn/ui": "^1.x"
}
```

---

## 🙌 Credits

- UI inspired by Figma designs.
- Icons by [Phosphor Icons](https://phosphoricons.com/).
- Built with ❤️ by [Your Name].

---

## 📃 License

This project is licensed under the MIT License.