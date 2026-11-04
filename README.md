# Joineazy – Assignment & Review Dashboard

A responsive assignment management dashboard built using **React.js and Tailwind CSS**. The application provides separate dashboards for Admins (Professors) and Students to manage assignments and track submissions.

## 1. Setup Steps

Follow these steps to run the project locally.

**Prerequisites**
- Node.js installed
- npm installed
- Git installed

**Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Chirag-2109/joineazy-assignment-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd joineazy-dashboard
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL provided in the terminal, usually `http://localhost:5173`.

**Production build**

To generate a production build, run:

```bash
npm run build
```

## 2. Folder Structure

```text
joineazy-dashboard/
│
├── public/
│
├── src/
│   ├── data/
│   │   ├── users.js
│   │   └── initialAssignments.js
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── StudentDashboard.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 3. Component Architecture

The application follows a component-based structure.

**App.jsx**
- Acts as the main component of the application.
- Handles mock login and logout.
- Maintains the shared assignment state.
- Saves assignment data to localStorage using useEffect.
- Displays the appropriate dashboard based on the logged-in user's role.

**Login.jsx**
- Displays the available mock user accounts.
- Allows users to log in as an Admin or Student.

**AdminDashboard.jsx**
- Allows admins to create, edit and delete assignments.
- Assigns work to selected students.
- Displays individual student submission statuses.
- Shows class submission progress.

**StudentDashboard.jsx**
- Displays assignments assigned to the logged-in student.
- Shows assignment details, due dates and Drive links.
- Provides a two-step submission confirmation.
- Displays individual submission progress.

**Data Files**
- `users.js` contains the seeded mock user accounts.
- `initialAssignments.js` contains the initial assignment data.

## 4. Key Design Decisions

**1. React State Management**

React's useState hook is used to manage application state. Assignment data is maintained in the main App component and passed to child components through props.

**2. LocalStorage**

LocalStorage is used to persist assignment and submission data. This allows the application to retain changes even after the browser is refreshed.

**3. Role-Based Dashboards**

The application supports two roles: Admin and Student. Each user sees only the data relevant to their role. Admins can manage assignments they created, while students can view and submit their assigned work.

**4. Mock Authentication**

A simple mock login system with seeded users is used instead of a real authentication service, as the assignment does not require a backend.

**5. Responsive Design**

Tailwind CSS utility classes are used to create a responsive interface that adapts to desktop and mobile screen sizes.

---

## Technologies Used

- React.js
- JavaScript
- Tailwind CSS
- Vite
- Browser LocalStorage
- Git and GitHub

## Project Links

- **GitHub Repository:** YOUR_GITHUB_REPOSITORY_URL
- **Live Demo:** YOUR_VERCEL_DEPLOYMENT_URL
- **Demo Video:** ADD_YOUR_VIDEO_LINK

