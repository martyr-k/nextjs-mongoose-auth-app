import RouteGuard from "components/RouteGuard";
import { useUser } from "contexts/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <RouteGuard>
      <h1>Hello {user?.email}!</h1>
    </RouteGuard>
  );
};

export default Home;
