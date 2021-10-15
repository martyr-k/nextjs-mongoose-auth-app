import { useEffect, useState } from "react";
import axios from "axios";

import PrivateRoute from "components/PrivateRoute";
import { useAuthentication } from "contexts/AuthenticationContext";

const Home = () => {
  const { token } = useAuthentication();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/users/current`, {
          headers: {
            authorization: token.value,
          },
        });

        setCurrentUser(response.data.user);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, [token]);

  return (
    <PrivateRoute>
      <h1>Hello {currentUser?.email}!</h1>
    </PrivateRoute>
  );
};

export default Home;
