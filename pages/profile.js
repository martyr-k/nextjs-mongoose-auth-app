import { Container } from "react-bootstrap";

import PrivateRoute from "components/PrivateRoute";
import useCurrentUser from "hooks/useCurrentUser";
import NavigationBar from "components/NavigationBar";

const Profile = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <NavigationBar user={currentUser} />
      <Container fluid>
        <h1>Hello {currentUser?.email}!</h1>
      </Container>
    </>
  );
};

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
};

export default ProfilePage;
