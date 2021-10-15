import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useUser } from "../contexts/UserContext";

const Home = () => {
  const { user } = useUser();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      // - toast message?
      router.push("/auth/login");
    } else {
      setAuthorized(true);
    }
  }, [user, router]);

  return authorized && <h1>Hello {user.email}!</h1>;
};

export default Home;
