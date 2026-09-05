# EduAssist — Study Abroad Consultancy & Cost Computation System

UI-only frontend prototype for a BSIT capstone project. React + Vite + Tailwind CSS.
No backend, auth, or database — every screen is powered by dummy data in `src/lib/data.js`.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Try it

- `/` — Landing page
- `/login` — use the **Student / Consultant / Admin** demo buttons to jump straight into each dashboard (typing real credentials will show the error state, since there's no backend)
- `/student` — Student dashboard and 8 sub-pages (Countries, Partner Schools, School Details, Cost Calculator, Currency Converter, Applications, Documents, Profile)
- `/consultant` — Consultant dashboard with Kanban pipeline, Student Management (CRM table + profile drawer), Application Review, Reports
- `/admin` — Admin dashboard, User/Country/School/Program management, Settings, System Logs

## Structure

```
src/
  components/ui/       reusable Button, Card, Modal, Badge, Input, etc.
  components/layout/   DashboardShell (role-aware sidebar + topbar + mobile nav)
  lib/data.js          all dummy data in one place — edit this to change what's shown
  pages/                landing, login
  pages/student/        8 pages
  pages/consultant/     4 pages
  pages/admin/          6 pages
```

## Design system

Tokens live in `tailwind.config.js`: primary blue `#2563EB`, secondary `#60A5FA`,
accent amber `#F59E0B`, success/warning greens/ambers, `surface` background `#F8FAFC`,
large radii (`rounded-xl2` = 20px, `rounded-xl3` = 24px), and `shadow-soft` / `shadow-lift`
for the card elevation used throughout. Fonts: Sora (display/headings) + Inter (body), loaded via Google Fonts in `index.html`.

## Notes for extending

- Every "Add / Edit / Delete" button already opens a real `Modal` — wire up state or an API later.
- Status badges pull their color from `statusColors` in `lib/data.js`, so adding a new status is a one-line change.
- The bottom mobile nav only renders for the student role, per the original brief (student-facing mobile use is the primary case); add role-specific bottom nav arrays in `DashboardShell.jsx` if you want it for consultant/admin too.
- Charts (`recharts`) and animations (`framer-motion`) are already wired into Reports, Cost Calculator, Currency Converter, and Landing — reuse the same patterns for any additional analytics views.
