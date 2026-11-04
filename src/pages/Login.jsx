import { users } from "../data/user";

function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-slate-800">
          Joineazy
        </h1>

        <p className="text-slate-500 mt-2 mb-6">
          Select your account to continue
        </p>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-slate-500 capitalize">
                  {user.role}
                </p>
              </div>

              <button
                onClick={() => onLogin(user)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Login;
