import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthentication } from "contexts/AuthenticationContext";

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

function useAuthenticatedClient(redirectTo, ...roles) {
  const router = useRouter();
  const { token } = useAuthentication();

  const { data, error } = useSWR(token && ["/api/users", token], fetcher, {
    errorRetryCount: 0,
    refreshWhenHidden: true,
    onError: (error) => {
      if (error.response.data === "jwt expired") {
        // mutate auth refresh?
        console.log("useAuthenticatedClient:", error.response);
      } else {
        console.log("useAuthenticatedClient:", error);
        toast.error(error.response.data);
      }
    },
  });
  const isLoading = !error && !data;

  useEffect(() => {
    if (!redirectTo || isLoading) return;

    // protected routes
    if (!data && !isLoading && redirectTo) {
      router.push(redirectTo);
    }

    // restricted routes
    if (roles.length > 0 && data && !roles.includes(data.user.role)) {
      toast.error(
        "Unauthorized access, you do not have the required permissions to access this page."
      );
      router.push(redirectTo);
    }
  }, [data, isLoading, redirectTo, router, token, roles]);

  return {
    user: data?.user,
    isLoading,
  };
}

export default useAuthenticatedClient;
