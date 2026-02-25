# AI Video Ads Generator SaaS

## Full Stack MERN (PostgreSQL) + Gemini API

### Features
- Authentication (JWT based)
- Beautiful & Responsive Frontend UI (React + TailwindCSS)
- Dashboards for Users and Admins
- Interactive AI Video Generation Editor
- Pricing & Subscription Interface
- Analytics Dashboard
- PostgeSQL schema and connection setup
- Mocked Backend APIs suitable for expansion

### Tech Stack
- Frontend: ReactJS, Vite, TailwindCSS, Lucide-React
- Backend: NodeJS, ExpressJS, PostgreSQL, JWT
- Tooling: concurrently (to run both)

### How to Run

1. **Setup Database**
   - Import the \`schema.sql\` into your PostgreSQL DB.
   - Configure \`backend/.env\` with \`DATABASE_URL\` and \`JWT_SECRET\`.

2. **Frontend**
   \`\`\`bash
   cd frontend
   npm install
   npm run dev
   \`\`\`

3. **Backend**
   \`\`\`bash
   cd backend
   npm install
   node server.js
   \`\`\`

You can view the aesthetic, modern dark-mode enabled UI that is setup with full page routing based on the defined SaaS structure!
