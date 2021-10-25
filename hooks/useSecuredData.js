import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";

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

function useSecuredData(path) {
  const { token } = useAuthentication();
  const { data, error } = useSWR(token && [path, token], fetcher, {
    errorRetryCount: 0,
    refreshWhenHidden: true,
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data);
    },
  });

  return {
    data,
    isLoading: !error && !data && token,
    isError: error,
  };
}

export default useSecuredData;
