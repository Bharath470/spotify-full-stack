import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/adminContext";
import { urlPOST } from "../App";

const AdminLogin = () => {
  const { setToken } = useContext(AdminContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await axios.post(`${urlPOST}/api/admin/login`, {
        email,
        password,
      });

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
      } else {
        setErrorMsg(response.data.message || "Invalid email or password.");
      }
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 font-sans text-white">
      {/* Header / Brand */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-black fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.627.627 0 0 1-.86.208c-2.355-1.439-5.32-1.765-8.814-.966a.625.625 0 0 1-.277-1.22c3.824-.875 7.102-.497 9.743 1.118a.625.625 0 0 1 .208.86zm1.226-2.724a.784.784 0 0 1-1.078.258c-2.696-1.658-6.806-2.138-9.995-1.17a.783.783 0 1 1-.453-1.5c3.64-1.104 8.19-.57 11.268 1.334a.784.784 0 0 1 .258 1.078zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.94.94 0 1 1-.548-1.8c3.528-1.07 9.4-0.87 13.123 1.341a.94.94 0 0 1-1.018 1.614z" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight">Spotify</span>
        </div>
        <p className="text-xs uppercase tracking-widest text-[#a7a7a7] font-semibold">
          Admin Console
        </p>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-sm bg-[#121212] p-8 rounded-xl border border-[#282828] shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white tracking-tight">
          Log in to continue
        </h1>

        {errorMsg && (
          <div className="mb-5 p-3 rounded bg-[#e91429]/15 border border-[#e91429]/40 text-[#f15e6c] text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b3b3b3] mb-2">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@spotify.com"
              className="w-full px-3.5 py-2.5 bg-[#121212] rounded-md border border-[#727272] text-sm text-white placeholder-[#535353] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b3b3b3] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[#121212] rounded-md border border-[#727272] text-sm text-white placeholder-[#535353] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] text-black font-bold text-sm rounded-full tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs text-[#727272]">
        Restricted to authorized personnel only.
      </p>
    </div>
  );
};

export default AdminLogin;
