import { createContext, useState, useContext } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url, token) => {
  return axios
    .get(url, {
      headers: {
        authorization: token.value,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(null);
  useSWR(token ? ["/api/auth/refresh-token", token] : null, fetcher, {
    refreshInterval: 15 * 60 * 1000,
    refreshWhenHidden: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <AuthenticationContext.Provider value={{ token, setToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
}

export { useAuthentication, AuthenticationProvider };
