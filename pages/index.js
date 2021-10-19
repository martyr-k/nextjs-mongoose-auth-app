import { Container } from "react-bootstrap";

import useCurrentUser from "hooks/useCurrentUser";
import NavigationBar from "components/NavigationBar";

const HomePage = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <NavigationBar user={currentUser} />
      <Container fluid>
        <h1>Welcome to the Home Page!</h1>
      </Container>
    </>
  );
};

export default HomePage;
