import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ContextType {
  token: boolean;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const MainContext = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<boolean>(
    window.localStorage.getItem("accessToken") !== null ? true : false
  );
  const checkToken = async () => {
    const token = window.localStorage.getItem("accessToken");
    const navigate = useNavigate()
    if (token) {
      try {
        const response = await fetch(
          "https://sea-turtle-app-c2icp.ondigitalocean.app/api/user/feed?limit=3000",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setToken(true);
        } else {
          setToken(false);
        }
      } catch (error) {
        console.error("Tokenni tekshirishda xatolik yuz berdi:", error);
        setToken(false);
        window.localStorage.clear();
        navigate('/')
        window.location.reload()
      }
    } else {
      setToken(false);
      window.localStorage.clear();
      navigate('/')
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
};