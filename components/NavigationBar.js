import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Link from "next/link";

const NavigationBar = ({ user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link href="/" passHref>
          <Navbar.Brand>Demo App</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarDropdown" />
        <Navbar.Collapse id="navbarDropdown">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav> */}
          <Navbar.Text className="ms-auto">
            {user ? (
              <Link href="/profile" passHref>
                <p className="mb-0">
                  Welcome, <a>{user.email}</a>
                </p>
              </Link>
            ) : (
              <Link href="/auth/login">
                <a>Login</a>
              </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
