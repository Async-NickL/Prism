# 🎯 Prism - Modern Project Management Platform

A sleek, feature-rich project management application built with Next.js 15, featuring organization-based project management, sprint planning, and intuitive issue tracking with a beautiful, animated UI.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.10.1-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

### 🏢 **Organization Management**
- Multi-organization support with role-based access control
- Admin-only permissions for sensitive operations
- Secure project creation and deletion

### 📅 **Sprint Planning**
- Create, start, and complete sprints with date ranges
- Visual sprint status management (Planned, Active, Completed)
- Sprint-based issue organization

### 📋 **Kanban Board**
- Drag-and-drop issue management across statuses
- Visual project tracking with multiple status columns
- Real-time updates and smooth animations

### 🎯 **Issue Tracking**
- Rich issue management with priorities (Low, Medium, High, Urgent)
- Assignee and reporter tracking
- Markdown support for detailed descriptions
- Issue linking to projects and sprints

### 🎨 **Modern UI/UX**
- Beautiful, animated components with Framer Motion
- Dark/Light theme support
- Responsive design for all devices
- Interactive 3D elements with Spline
- Smooth loading states and feedback

### 🔐 **Authentication & Security**
- Clerk-powered authentication
- Role-based access control
- Secure API endpoints
- Protected routes and middleware

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Aceternity UI + ShadCn** - Accessible component primitives
- **Lucide React** - Icon library

### **Backend & Database**
- **Prisma** - Database ORM
- **NeonDB with PostgreSQL** - Primary database
- **Next.js Server actions** - Backend

### **Authentication & Security**
- **Clerk** - Authentication and user management

### **UI Components & Libraries**
- **@hello-pangea/dnd** - Drag and drop functionality
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Vaul** - Drawer components
- **Date-fns** - Date manipulation
- **React Day Picker** - Date picker component

---

## 🚀 Getting Started

### Prerequisites
- Node.js 
- NeonDB PostgreSQL database
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Async-NickL/Prism.git
   cd prism
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database (Neon DB)
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database_name?sslmode=require"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Next.js
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # For development (pushes schema changes directly)
   npx prisma db push
   
   # For production (applies migrations)
   npx prisma migrate deploy
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
prism/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (Home)/            # Landing page components
│   ├── (main)/            # Main application routes
│   │   ├── organization/  # Organization management
│   │   └── project/       # Project and issue management
│   └── layout.js          # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── actions/              # Server actions
└── hooks/                # Custom React hooks
```

## 🎯 Key Features in Detail

### **Organization-based Architecture**
- Secure multi-tenant system
- Admin-only project management
- Role-based permissions

### **Sprint Management**
- Visual sprint board
- Date range planning
- Status tracking (Planned → Active → Completed)

### **Issue Tracking System**
- Priority levels (Low, Medium, High, Urgent)
- Status workflow (Todo → In Progress → In Review → Done)
- Assignee and reporter tracking
- Rich markdown descriptions

### **Modern UI Components**
- Animated transitions and micro-interactions
- Responsive design patterns
- Accessibility-first approach
- Dark/Light theme support

---

## 🙏 Special Thanks

A huge thank you to **[Roadside Coder](https://www.youtube.com/@RoadsideCoder)** for the incredible inspiration and guidance that helped bring this project to life. Your YouTube channel has been an invaluable resource for learning modern web development techniques and best practices.

---

**Built with ❤️ using Next.js
