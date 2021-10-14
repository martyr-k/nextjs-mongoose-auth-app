import axios from "axios";
import { useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post("/api/auth/signup", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      const { data: user } = response.data;
      console.log(user);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.data.message);
      }
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <Form
        className="mx-auto"
        style={{ maxWidth: "50%" }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3">Sign Up</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="placeholder@example.com"
            ref={emailRef}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            ref={passwordRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
