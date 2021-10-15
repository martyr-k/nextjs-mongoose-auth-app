import PrivateRoute from "components/PrivateRoute";
import { useAuthentication } from "contexts/AuthenticationContext";

const Home = () => {
  const { token } = useAuthentication();

  return (
    <PrivateRoute>
      <h1>Hello {user?.email}!</h1>
    </PrivateRoute>
  );
};

export default Home;
