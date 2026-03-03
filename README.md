# APS Security — Frontend Design Challenge

A production-grade React application for a B2B SaaS cybersecurity platform, built as a frontend design challenge for Fenrir Security.

## Tech Stack

- **React 18** with functional components and hooks
- **React Router v6** for client-side routing
- **Vite** as the build tool
- **Lucide React** for icons
- **DM Sans** (UI font) + **JetBrains Mono** (console/code font)
- Pure CSS with custom properties (no Tailwind dependency needed)

##  Setup & Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view the app.


```

## 🎨 Design Decisions

### Theme System
- CSS custom properties for instant theme switching
- Dark mode (default): near-black surfaces (#0F0F0F → #1A1A1A)
- Light mode: white/light-gray surfaces (#F5F5F5)
- Persisted in localStorage

### Color Palette
- Primary accent: `#0CC8A8` (teal)
- Critical: `#EF4444` (red)
- High: `#F97316` (orange)
- Medium: `#EAB308` (yellow)
- Low: `#22C55E` (green)

### Mock Data
All data is hardcoded in `src/data/mockData.js` — no backend required.

##  Features Implemented

- **Screen 1**: Split-layout login with form validation, social login, password toggle
- **Screen 2**: Full dashboard with severity stats, searchable/filterable scan table, pagination
- **Screen 3**: Active scan with circular progress, step tracker, live console (animated logs), finding log
- **Dark/Light mode**: Global toggle in sidebar, applied instantly
- **Navigation**: Login → Dashboard → Scan Detail, breadcrumb navigation
- **Interactivity**: Toast notifications, New Scan modal, Export/Stop buttons, tab switching
- **Responsive**: Mobile sidebar drawer, responsive grid layouts

##  Known Limitations

- No real backend — all data is mocked
- Social login (Apple/Google/Meta) redirects to dashboard without real OAuth
- Scan "progress" does not animate over time (static mock state)
- No actual file upload support for Credentials/Checklists
