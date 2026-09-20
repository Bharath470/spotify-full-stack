import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const urlPOST = "http://localhost:4000";

const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("user-token") || "",
  );
  const [user, setUser] = useState<User | null>(null);

  // Ask the backend "who am I?" using the current token. This is the
  // protected /api/user/profile route from the backend - it only responds
  // if authUser middleware accepts the token.
  const loadProfile = async (activeToken: string) => {
    try {
      const response = await axios.get(`${urlPOST}/api/user/profile`, {
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      // Token expired or invalid - clear it out so the UI shows Login again.
      setToken("");
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("user-token", token);
      loadProfile(token);
    } else {
      localStorage.removeItem("user-token");
      setUser(null);
    }
  }, [token]);

  const logout = () => setToken("");

  const contextValue = { token, setToken, user, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
