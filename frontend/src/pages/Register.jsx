import { useState } from "react";
import { register } from "../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerHandler = async () => {
    const res = await register({ name, email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Registered Successfully");
    } else {
      alert(res.message);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 border rounded w-80">
        <h1 className="text-xl mb-4">Register</h1>
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={registerHandler}
          className="bg-green-500 text-white w-full py-2 cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
