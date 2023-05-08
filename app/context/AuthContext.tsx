"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({
          loading: false,
          data: null,
          error: null,
        });
      }

      const response = await axios.get(`http://localhost:3000/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        loading: false,
        data: response?.data,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error?.response?.data?.errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
