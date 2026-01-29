# JobInternHub 🚀

Full-stack job/internship portal with advanced search, filtering, pagination, user auth, and application system.

**Live Demo:** https://job-intern-hub.vercel.app
Backend-Render: https://job-intern-hub-r9ky.onrender.com

## ✨ Features
- **Job Search** - Search by title, location, skills, job type (Internship/Full-time)
- **Advanced Filters** - Location, job type, skills, real-time search
- **Pagination** - 9 jobs per page with accurate page count
- **User Auth** - Register/Login with JWT, protected routes
- **Job Applications** - Apply with resume link + cover note
- **Admin Dashboard** - Create/Edit/Delete jobs, see all jobs (active/inactive)
- **Responsive Design** - Mobile-first TailwindCSS UI
- **Production Ready** - CORS, error handling, env vars

## 🛠️ Tech Stack
Frontend: React 18 + Vite + TailwindCSS + React Router
Backend: Node.js + Express + MongoDB (Mongoose)
Auth: JWT + bcryptjs
Deployment: Vercel (Frontend) + Render (Backend)
Database: MongoDB Atlas
API Testing: Postman

text

## 📁 Project Structure
JobInternHub/
├── frontend/ # React + Vite
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Jobs.jsx # Job listing + filters + pagination
│ │ │ └── JobDetail.jsx # Single job + apply form
│ │ ├── components/
│ │ │ └── JobCard.jsx
│ │ └── context/AuthContext.jsx
│ └── vite.config.js
├── backend/ # Node + Express
│ ├── models/
│ │ ├── Job.js
│ │ └── Application.js
│ ├── routes/
│ │ └── jobs.js
│ ├── middleware/
│ │ ├── auth.js
│ │ └── admin.js
│ └── index.js
└── README.md
