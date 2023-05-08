import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { deleteCookie } from "cookies-next";
import axios from "axios";

const URL = "http://localhost:3000/";

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const response = await axios.post(`${URL}/api/auth/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        setAuthState({
          loading: false,
          data: response.data,
          error: null,
        });

        handleClose();
      }
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error?.response?.data?.errorMessage,
      });
    }
  };

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      phone,
      city,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
      city: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const response = await axios.post(`${URL}/api/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
        phone,
        city,
      });

      if (response.status === 200) {
        setAuthState({
          loading: false,
          data: response.data,
          error: null,
        });

        handleClose();
      }
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error?.response?.data?.errorMessage,
      });
    }
  };

  const signout = () => {
    deleteCookie("jwt");

    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signin, signup, signout, data, error, loading, setAuthState };
};

export default useAuth;
