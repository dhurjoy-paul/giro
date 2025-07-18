# 🌍 GIRO

_"Not just tours. Experiences."_

Welcome to **GIRO**, a dynamic and modern tourism management platform built to showcase the beauty and culture of Bangladesh. This site empowers tourists, tour guides, and administrators to connect, explore, and manage travel stories and packages with ease.

### 📧 Email

```txt
aizen@admin.com
```

### 🔑 Password

```txt
Asdf1234
```

## 🔗 Live Site

#### 🌐 [Visit GIRO live](https://ph-assignment-12-c3db9.web.app)

---

## 🚀 Features

- 🧭 **Responsive Multi-role Dashboard:** Three roles – Tourist, Tour Guide, Admin – each with dedicated dashboards and functionalities.
- 🎒 **Tour Package Management:** Admin can add/manage packages. Tourists can view, book, and pay via Stripe. Tour guides are assigned based on user selection.
- 📚 **Tourist Stories Feature:** Tourists and tour guides can write, edit, and delete travel stories with images.
- 🔐 **JWT Authentication & Role Protection:** Secure route handling using JSON Web Tokens and role-based access.
- 🔎 **Dynamic Tour Guide & Package Browsing:** Tab-based sections powered by `react-tabs`, with random data fetching using MongoDB `$sample`.
- 📸 **Gallery with Lightbox:** Each package has a photo gallery showcasing stunning locations using Cloudinary-hosted images.
- 📅 **Booking System:** Smart booking form with prefilled user data, date picker, and booking status management.
- 🎉 **Booking Achievement Animation:** Confetti animation for users who book more than 3 trips.
- 🧠 **State Management:** All data fetching implemented with `@tanstack/react-query` (GET) and protected via interceptors.
- 🔄 **Edit Stories with Mongo Operators:** Stories can be updated using `$push` and `$pull` to handle image lists.
- 💬 **Share Stories on Social Media:** Built-in `react-share` support allows users to share stories directly on Facebook.
- 🎨 **Attractive UI Libraries:** Designed with TailwindCSS, DaisyUI, HeadlessUI, and Framer Motion for beautiful transitions.
- ⚙️ **Environment Variables:** All sensitive keys (Firebase, MongoDB) are secured using `.env` files.
- 📱 **Fully Responsive:** Supports mobile, tablet, and desktop views, including a responsive sidebar layout for the dashboard.

---

## 🧩 Tech Stack

- **Frontend:** React, TailwindCSS, DaisyUI, HeadlessUI, React Query, React Router, React Hook Form, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB, JWT, Stripe
- **Authentication:** Firebase Email/Password & Google OAuth
- **Image Storage:** Cloudinary
- **Packages Used:** React-Datepicker, React-Share, SweetAlert2, TanStack Query, Framer Motion

---

```
ph-assignment-12-client
├─ .firebase
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
├─ README.md
├─ src
│  ├─ assets
│  ├─ components
│  ├─ contexts
│  │  ├─ AuthProvider.jsx
│  │  └─ ThemeContext.jsx
│  ├─ firebase
│  │  └─ firebase.config.js
│  ├─ hooks
│  │  ├─ useAuth.js
│  │  ├─ useAxiosSecure.jsx
│  │  ├─ useNavbarBehavior.js
│  │  └─ useRole.js
│  ├─ index.css
│  ├─ layouts
│  │  ├─ AuthLayout.jsx
│  │  ├─ DashboardLayout.jsx
│  │  └─ MainLayout.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ AboutUs
│  │  ├─ Community
│  │  ├─ dashboard
│  │  │  ├─ admin
│  │  │  ├─ common
│  │  │  ├─ menus
│  │  │  ├─ sidebar
│  │  │  ├─ tourGuide
│  │  │  └─ tourist
│  │  ├─ Error
│  │  │  └─ ErrorPage.jsx
│  │  ├─ Guide
│  │  ├─ Home
│  │  ├─ Login
│  │  │  └─ Login.jsx
│  │  ├─ SignUp
│  │  │  └─ SignUp.jsx
│  │  └─ Trips
│  ├─ routes
│  │  ├─ AdminRoute.jsx
│  │  ├─ CommonRoute.jsx
│  │  ├─ GuideRoute.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ router.jsx
│  │  └─ TouristRoute.jsx
│  └─ utils
│     ├─ saveUserInDb.js
│     ├─ ScrollToHashElement.jsx
│     └─ validate.js
└─ vite.config.js

```

#### 🖋️ Designed & Developed by [Dhurjoy Paul](https://www.facebook.com/dhurjoy.dev).
