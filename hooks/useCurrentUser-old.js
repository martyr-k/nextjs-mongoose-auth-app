import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useAuthentication } from "contexts/AuthenticationContext";

const useCurrentUser = () => {
  const { token } = useAuthentication();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const response = await axios.get(`/api/users`, {
            headers: {
              authorization: token.value,
            },
          });
          setCurrentUser(response.data.user);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    })();
  }, [token]);

  return { currentUser, isLoading };
};

export default useCurrentUser;
