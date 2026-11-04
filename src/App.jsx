
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { initialAssignments } from "./data/initialAssignmet";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Load saved assignments, or use initial data on the first visit
  const [assignments, setAssignments] = useState(() => {
    try {
      const savedData = localStorage.getItem("joineazy_assignments");
      return savedData ? JSON.parse(savedData) : initialAssignments;
    } catch {
      return initialAssignments;
    }
  });

  // Save assignments whenever they change
  useEffect(() => {
    localStorage.setItem(
      "joineazy_assignments",
      JSON.stringify(assignments)
    );
  }, [assignments]);

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Joineazy
          </h1>
          <p className="text-slate-500">
            Welcome, {currentUser.name}
          </p>
          <p className="text-sm capitalize text-blue-600">
            {currentUser.role} Dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {currentUser.role === "admin" ? (
        <AdminDashboard
          assignments={assignments}
          setAssignments={setAssignments}
          currentUser={currentUser}
        />
      ) : (
        <StudentDashboard
          assignments={assignments}
          setAssignments={setAssignments}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default App;
