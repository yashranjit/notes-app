import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

const App = () => {
  const [page, setPage] = useState("login");
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notes App</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setPage("login")}
            className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => setPage("register")}
            className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            Register
          </button>

          <button
            onClick={() => setPage("notes")}
            className="px-3 py-1 rounded bg-blue-500 text-white cursor-pointer"
          >
            Notes
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        {page === "login" && <Login />}
        {page === "register" && <Register />}
        {page === "notes" && <Notes />}
      </div>
    </div>
  );
};

export default App;
