import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

const PageLayout = ({ children, user }) => {
  return (
    <>
      <NavigationBar user={user} />
      <Container fluid>{children}</Container>
    </>
  );
};

export default PageLayout;
