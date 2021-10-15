import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user);

  return <h1>Hello {user.email}!</h1>;
};

export default Home;
