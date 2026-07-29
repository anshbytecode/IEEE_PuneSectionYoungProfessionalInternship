# IEEE YP Pune Section Website

The IEEE YP Pune Section Website is a full-stack web application designed to serve as the official digital platform for the IEEE Young Professionals Pune Chapter. The website enables visitors to explore events, campaigns, blogs, resources, and membership information, while providing an intuitive Content Management System (CMS) for IEEE committee members to manage content without writing code. 

---

## 🚀 Features

### Public Website
- Responsive modern UI
- Home page with IEEE YP overview
- Events listing with registration
- Campaigns showcase
- Blog & Resources
- YP Talks
- About Us
- Join IEEE
- Contact page
- Newsletter subscription
- Announcement banner

### Admin CMS
- Secure JWT Authentication
- Dashboard
- Events Management
- Team Management
- Blog Management
- Campaign Management
- Media Library
- Registrations Viewer
- Announcement Management

These capabilities are defined in the project requirements for both the public-facing website and the admin CMS. 

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React Hook Form
- Zod

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
- Cloudinary
- Resend Email API

### Database
- PostgreSQL (Supabase)

### Deployment
- Vercel
- Railway
- GitHub Actions

The PRD specifies these technologies and deployment services for the project.

---

## 📂 Project Structure

```text
IEEEwebsite/
│
├── client/                 # Frontend
├── server/                 # Backend
├── database/               # SQL Scripts
├── public/
├── src/
├── assets/
├── docs/
├── README.md
└── package.json
```

## 🌐 Main Modules

- Home
- About
- Events
- Campaigns
- Blog
- Resources
- YP Talks
- Join IEEE
- Contact
- Admin Dashboard
- Media Library

The PRD defines the application's navigation and routes for these modules.

---

## 🗄 Database

The application uses PostgreSQL with tables including:

- Events
- Event Registrations
- Team Members
- Blogs
- Campaigns
- Resources
- Announcements
- Newsletter Subscribers
- Contact Submissions
- Admin Users

These are the core entities defined in the backend schema. 

---

## 🔐 Security

- JWT Authentication
- bcrypt Password Hashing
- Helmet Security
- Rate Limiting
- Input Validation
- Parameterized SQL Queries

The authentication flow and security requirements are specified in the PRD. 

## 🎯 Project Goal

To build a scalable, responsive, and CMS-driven official IEEE Young Professionals Pune Section website that enables seamless content management while delivering an engaging experience for students, professionals, and IEEE members. 

---

## 📄 License

This project is developed for the IEEE Young Professionals Pune Section for educational and organizational purposes.
https://ieeepunesection.vercel.app/

