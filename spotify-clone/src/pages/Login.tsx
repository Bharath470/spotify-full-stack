import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const urlPOST = "http://localhost:4000";

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState<"Login" | "Sign Up">(
    "Login",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint =
        currentState === "Login" ? "/api/user/login" : "/api/user/register";
      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      const response = await axios.post(`${urlPOST}${endpoint}`, payload);

      if (response.data.success) {
        setToken(response.data.token);
        navigate("/");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] grid place-items-center text-white">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 bg-[#181818] border border-gray-700 p-8 rounded-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold">{currentState}</h2>

        {currentState === "Sign Up" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              className="bg-transparent border border-gray-600 rounded p-2 outline-green-500"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="bg-transparent border border-gray-600 rounded p-2 outline-green-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="bg-transparent border border-gray-600 rounded p-2 outline-green-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-black font-semibold py-2.5 rounded cursor-pointer disabled:opacity-60"
        >
          {loading ? "Please wait..." : currentState}
        </button>

        {currentState === "Login" ? (
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-green-500 cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-green-500 cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
