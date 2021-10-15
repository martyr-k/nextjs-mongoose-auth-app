import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthentication } from "contexts/AuthenticationContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuthentication();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!token) {
      // - toast message?
      router.push("/auth/login");
    } else {
      setAuthorized(true);
    }
  }, [token, router]);

  return authorized && children;
};

export default PrivateRoute;
