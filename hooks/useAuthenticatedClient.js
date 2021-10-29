import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthentication } from "contexts/AuthenticationContext";

let requestCount = 0;

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
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(token && ["/api/users", token], fetcher, {
    shouldRetryOnError: false,
    refreshWhenHidden: true,
    revalidateOnFocus: false,
    onError: (error) => {
      if (error.response.data === "jwt expired") {
        if (requestCount < 1) {
          requestCount = 1;
          mutate("/api/auth/refresh-token");
        }
      } else {
        console.log("useAuthenticatedClient:", error);
        toast.error(error.response.data);
      }
    },
    onSuccess: () => {
      requestCount = 0;
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
