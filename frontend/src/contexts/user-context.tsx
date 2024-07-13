"use client";

import { redirect, usePathname} from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: any;
  setUser: (user: any) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { }
});

type UserProviderProps = {
  children: React.ReactNode;
};

const getToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedItem = localStorage.getItem("access_token");
    if (storedItem) {
      try {
        const parsedInfo = JSON.parse(storedItem)
        return parsedInfo;
      } catch (error) {
        console.error("Error parsing tripInfo from localStorage:", error);
      }
    }
  }
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(getToken());
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user is authenticated
    if (!user) {
      if (pathname !== "/authentication/login") {
        redirect("/authentication/login");
      }
    }
    
  }, [user, pathname]);

  return (
    <UserContext.Provider value={{
      user,
      setUser

    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
}