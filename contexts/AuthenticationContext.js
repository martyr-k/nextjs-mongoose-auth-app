import { createContext, useState, useContext } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const authFetcher = (url) => {
  return axios.get(url).then((response) => {
    return response.data;
  });
};

const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const privatePaths = ["/profile", "/events/new"];
  const path = router.asPath.split("?")[0];

  useSWR("/api/auth/refresh-token", authFetcher, {
    refreshInterval: 14 * 60 * 1000, // jwt may expire before refresh occurs, reduce time to make sure
    refreshWhenHidden: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    shouldRetryOnError: false,
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error) => {
      if (privatePaths.includes(path)) {
        toast.error(error.response.data.message);
        router.push("/auth/login");
      }
      setToken(null);
    },
  });

  const signOut = async () => {
    try {
      await axios.post("/api/auth/logout");
      setToken(null);
      if (privatePaths.includes(path)) {
        router.push("/");
      }
    } catch (error) {
      toast.error(
        <div className="text-center">
          <p>{error.response.data.message}</p>
          <button
            className="btn btn-primary"
            onClick={path === "/" ? () => setToken(null) : router.reload}
          >
            Reload
          </button>
        </div>
      );
    }
  };

  return (
    <AuthenticationContext.Provider value={{ token, setToken, signOut }}>
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
