import React, { createContext, useEffect, useState } from "react";

type AdminContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
};


export const AdminContext = createContext<AdminContextType>({} as AdminContextType);

const AdminContextProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(localStorage.getItem("admin-token") || "");

  useEffect(() => {
    if (token) localStorage.setItem("admin-token", token);
    else localStorage.removeItem("admin-token");
  }, [token]);

  const logout = () => setToken("");
  const contextValue = { token, setToken, logout };

  return <AdminContext.Provider value={contextValue}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;