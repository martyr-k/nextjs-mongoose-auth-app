import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
// import { Nav } from "react-bootstrap";
import Link from "next/link";
import { useAuthentication } from "contexts/AuthenticationContext";

const NavigationBar = ({ user }) => {
  const { signOut } = useAuthentication();

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
              <>
                <span className="me-3">
                  Welcome,{" "}
                  <Link href="/profile">
                    <a>{user.email}</a>
                  </Link>
                </span>
                <button className="btn btn-danger" onClick={signOut}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <a className="me-2">Login</a>
                </Link>
                <Link href="/auth/signup">
                  <a>Sign Up</a>
                </Link>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
