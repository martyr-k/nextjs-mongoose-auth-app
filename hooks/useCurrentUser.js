import { useState, useEffect } from "react";
import axios from "axios";

import { useAuthentication } from "contexts/AuthenticationContext";

const useCurrentUser = () => {
  const { token } = useAuthentication();
  const [currentUser, setCurrentUser] = useState(null);

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
        }
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, [token]);

  return currentUser;
};

export default useCurrentUser;
