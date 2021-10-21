import useSWR from "swr";
import axios from "axios";

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
  const { data, error } = useSWR(token && ["/api/users", token], userFetcher);

  return {
    currentUser: data?.user,
    isLoading: !error && !data && token,
    isError: error,
  };
}

export default useCurrentUser;
