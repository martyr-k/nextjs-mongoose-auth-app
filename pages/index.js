import { useUser } from "../contexts/UserContext";

const Home = () => {
  const { user } = useUser();

  return <h1>Hello {user.email}!</h1>;
};

export default Home;
