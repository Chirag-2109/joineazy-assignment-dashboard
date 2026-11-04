
import { useState } from "react";

function StudentDashboard({ assignments, setAssignments, currentUser }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Get only assignments assigned to this student
  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedTo.includes(currentUser.id)
  );

  const submittedCount = myAssignments.filter(
    (assignment) => assignment.submissions[currentUser.id]
  ).length;

  const totalCount = myAssignments.length;

  const progress =
    totalCount > 0 ? (submittedCount / totalCount) * 100 : 0;

  // Final submission confirmation
  function confirmSubmission() {
    setAssignments((previous) =>
      previous.map((assignment) => {
        if (assignment.id !== selectedAssignment.id) {
          return assignment;
        }

        return {
          ...assignment,
          submissions: {
            ...assignment.submissions,
            [currentUser.id]: true,
          },
        };
      })
    );

    setSelectedAssignment(null);
  }

  return (
    <div className="mt-8 space-y-6">

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          My Assignments
        </h2>
        <p className="text-slate-500">
          View your tasks and track your progress.
        </p>
      </div>

      {/* Progress card */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-slate-700">
              Overall Progress
            </h3>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {submittedCount} / {totalCount}
            </p>
            <p className="text-sm text-slate-500">
              Assignments submitted
            </p>
          </div>

          <span className="text-2xl font-bold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Assignment cards */}
      {myAssignments.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold">
            No assignments available
          </h3>
          <p className="mt-2 text-slate-500">
            Your professor hasn't assigned any work yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {myAssignments.map((assignment) => {
            const isSubmitted =
              assignment.submissions[currentUser.id];

            const isOverdue =
              !isSubmitted &&
              new Date(assignment.dueDate + "T23:59:59") < new Date();

            return (
              <div
                key={assignment.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-800">
                    {assignment.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      isSubmitted
                        ? "bg-green-100 text-green-700"
                        : isOverdue
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isSubmitted
                      ? "Submitted"
                      : isOverdue
                      ? "Overdue"
                      : "Pending"}
                  </span>
                </div>

                <p className="mt-3 text-slate-600">
                  {assignment.description}
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  Due date: {assignment.dueDate}
                </p>

                <a
                  href={assignment.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-blue-600 underline"
                >
                  Open Assignment Drive Link
                </a>

                {isSubmitted ? (
                  <button
                    disabled
                    className="mt-5 w-full rounded-lg bg-green-100 px-4 py-3 font-medium text-green-700"
                  >
                    <span className="mr-2">✓</span>
                    Assignment Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Yes, I have submitted
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Final confirmation dialog */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-slate-800">
              Confirm Submission
            </h3>

            <p className="mt-3 text-slate-600">
              Are you sure you have submitted{" "}
              <strong>{selectedAssignment.title}</strong>?
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Once confirmed, your assignment status will change to Submitted.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={confirmSubmission}
                className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex-1 rounded-lg border px-4 py-3 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
