import { createContext, useState, useContext } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";

const authFetcher = (url) => {
  return axios.get(url).then((response) => {
    return response.data;
  });
};

const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const privatePaths = ["/"];
  const path = router.asPath.split("?")[0];

  useSWR("/api/auth/refresh-token", authFetcher, {
    refreshInterval: 15 * 60 * 1000,
    refreshWhenHidden: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: !privatePaths.includes(path), // if private path, false, else true
    shouldRetryOnError: false,
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error) => {
      console.log(error.response.data.message);

      // - add query param to hold error message to show toast on login screen
      router.push("/auth/login");
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
