import { createContext, useState } from "react";

interface ContextType {
  token: boolean;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const MainContext = ({ children }: { children: React.ReactNode }) => {
  // const [token, setToken] = useState<boolean>(false)
  const [token, setToken] = useState<boolean>(
    window.localStorage.getItem("accessToken") !== null
      ? JSON.parse(window.localStorage.getItem("accessToken")!)
      : false
  );
  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
};
