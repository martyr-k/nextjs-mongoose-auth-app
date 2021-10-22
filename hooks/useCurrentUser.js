import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";

import { useAuthentication } from "contexts/AuthenticationContext";

const userFetcher = (url, token) => {
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

function useCurrentUser() {
  const { token } = useAuthentication();
  const { data, error } = useSWR(token && ["/api/users", token], userFetcher, {
    errorRetryCount: 0,
    refreshWhenHidden: true,
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data);
    },
  });

  return {
    currentUser: data?.user,
    isLoading: !error && !data && token,
    isError: error,
  };
}

export default useCurrentUser;
