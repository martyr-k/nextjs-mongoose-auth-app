import useUser from "../lib/user";

const Home = () => {
  const { user } = useUser();

  console.log(user);

  return <h1>Hello {user.email}!</h1>;
};

export default Home;
