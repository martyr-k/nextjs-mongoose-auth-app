import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

import { useAuthentication } from "contexts/AuthenticationContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuthentication();
  const [authorized, setAuthorized] = useState(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!token) {
      mutate("/api/auth/refresh-token");
    } else {
      setAuthorized(true);
    }
  }, [mutate, token]);

  return authorized && children;
};

export default PrivateRoute;
