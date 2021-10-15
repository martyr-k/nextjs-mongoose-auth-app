import PrivateRoute from "components/PrivateRoute";
import { useUser } from "contexts/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <PrivateRoute>
      <h1>Hello {user?.email}!</h1>
    </PrivateRoute>
  );
};

export default Home;
