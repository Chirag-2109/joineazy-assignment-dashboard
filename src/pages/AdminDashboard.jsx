
import { useState } from "react";
import { users } from "../data/user";

function AdminDashboard({ assignments, setAssignments, currentUser }) {
  const students = users.filter((user) => user.role === "student");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
    assignedTo: [],
  });

  // Admin should only see assignments created by them
  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === currentUser.id
  );

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Select or unselect a student
  function handleStudentChange(studentId) {
    setFormData((previous) => ({
      ...previous,
      assignedTo: previous.assignedTo.includes(studentId)
        ? previous.assignedTo.filter((id) => id !== studentId)
        : [...previous.assignedTo, studentId],
    }));
  }

  function openCreateForm() {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      driveLink: "",
      assignedTo: [],
    });

    setShowForm(true);
  }

  function openEditForm(assignment) {
    setEditingId(assignment.id);

    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      driveLink: assignment.driveLink,
      assignedTo: assignment.assignedTo,
    });

    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.assignedTo.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    if (editingId) {
      // Update existing assignment
      setAssignments((previous) =>
        previous.map((assignment) => {
          if (assignment.id !== editingId) return assignment;

          const updatedSubmissions = {};

          formData.assignedTo.forEach((studentId) => {
            updatedSubmissions[studentId] =
              assignment.submissions[studentId] || false;
          });

          return {
            ...assignment,
            ...formData,
            submissions: updatedSubmissions,
          };
        })
      );
    } else {
      // Create new assignment
      const newAssignment = {
        id: Date.now().toString(),
        ...formData,
        createdBy: currentUser.id,
        submissions: {},
      };

      formData.assignedTo.forEach((studentId) => {
        newAssignment.submissions[studentId] = false;
      });

      setAssignments((previous) => [...previous, newAssignment]);
    }

    setShowForm(false);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    setAssignments((previous) =>
      previous.filter((assignment) => assignment.id !== id)
    );
  }

  return (
    <div className="mt-8 space-y-6">

      {/* Dashboard heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Admin Dashboard
          </h2>
          <p className="text-slate-500">
            Manage assignments and track student submissions.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Create Assignment
        </button>
      </div>

      {/* Create/Edit form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold">
            {editingId ? "Edit Assignment" : "Create Assignment"}
          </h3>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Assignment title"
            required
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Assignment description"
            required
            rows="3"
            className="w-full rounded-lg border p-3"
          />

          <div>
            <label className="mb-1 block text-sm font-medium">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <input
            type="url"
            name="driveLink"
            value={formData.driveLink}
            onChange={handleChange}
            placeholder="Google Drive link"
            required
            className="w-full rounded-lg border p-3"
          />

          <div>
            <h4 className="mb-3 font-semibold">Assign to students</h4>

            <div className="grid gap-3 sm:grid-cols-2">
              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.assignedTo.includes(student.id)}
                    onChange={() => handleStudentChange(student.id)}
                  />
                  <span>{student.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingId ? "Save Changes" : "Create Assignment"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Assignment list */}
      {myAssignments.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h3 className="text-lg font-semibold">No assignments yet</h3>
          <p className="mt-2 text-slate-500">
            Create your first assignment to get started.
          </p>
        </div>
      ) : (
        myAssignments.map((assignment) => {
          const submittedCount = assignment.assignedTo.filter(
            (studentId) => assignment.submissions[studentId]
          ).length;

          const totalStudents = assignment.assignedTo.length;

          const progress =
            totalStudents > 0
              ? (submittedCount / totalStudents) * 100
              : 0;

          return (
            <div
              key={assignment.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {assignment.title}
                  </h3>

                  <p className="mt-2 text-slate-600">
                    {assignment.description}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Due: {assignment.dueDate}
                  </p>

                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-blue-600 underline"
                  >
                    Open Drive Link
                  </a>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(assignment)}
                    className="h-fit rounded-lg bg-amber-100 px-4 py-2 text-amber-800"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="h-fit rounded-lg bg-red-100 px-4 py-2 text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Class progress */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Class Progress</span>
                  <span>
                    {submittedCount} / {totalStudents} submitted
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Student submission status */}
              <div className="mt-6">
                <h4 className="mb-3 font-semibold">Student Submissions</h4>

                <div className="space-y-2">
                  {assignment.assignedTo.map((studentId) => {
                    const student = students.find(
                      (user) => user.id === studentId
                    );

                    if (!student) return null;

                    const submitted =
                      assignment.submissions[studentId];

                    return (
                      <div
                        key={studentId}
                        className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                      >
                        <span>{student.name}</span>

                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            submitted
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {submitted ? "Submitted" : "Not Submitted"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default AdminDashboard;
