import useSWRImmutable from "swr/immutable";

const fetcher = (url) => {
  return axios.get(url).then((response) => response.data);
};

function useUser(token) {
  const { data, mutate, error } = useSWRImmutable(
    `/api/users/${token}`,
    fetcher
  );

  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export default useUser;
