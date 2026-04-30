# AI Video Ads Generator

## Full Stack MERN  + Gemini API

### Features
- Authentication (JWT based)
- Beautiful & Responsive Frontend UI (React + TailwindCSS)
- Dashboards for Users and Admins
- Interactive AI Video Generation Editor
- Pricing & Subscription Interface
- Analytics Dashboard
- DB schema and connection setup
- Mocked Backend APIs suitable for expansion

### Tech Stack
- Frontend: ReactJS, Vite, TailwindCSS, Lucide-React
- Backend: NodeJS, ExpressJS, PostgreSQL, JWT
- Tooling: concurrently (to run both)

### How to Run

1. **Setup Database**
   - Import the \`schema.sql\` into your DB.
   - Configure \`backend/.env\` with \`DATABASE_URL\` and \`JWT_SECRET\`.

2. **Frontend**
   \`\`\`bash
   cd frontend
   npm install
   npm run dev   
   \`\`\`

3. **Backend (Spring Boot)**
   The backend has been rewritten in Spring Boot for better performance and enterprise capabilities!
   
   To run it, navigate to the `backend-springboot` folder:
   ```bash
   cd backend-springboot
   ./apache-maven-3.9.6/bin/mvn spring-boot:run
   ```
   *(Note: JDK 17+ and MongoDB must be running locally)*

You can view the aesthetic, modern dark-mode enabled UI that is setup with full page routing based on the defined SaaS structure!
