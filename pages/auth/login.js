import axios from "axios";
import Router from "next/router";
import { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import PageLayout from "components/PageLayout";
import { useAuthentication } from "contexts/AuthenticationContext";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { token, setToken } = useAuthentication();

  useEffect(() => {
    if (token) {
      Router.replace("/");
    }
  }, [token]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post("/api/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      toast.success("Success!");
      setToken(response.data.token);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <PageLayout>
      <Form
        className="mt-5 mx-auto"
        style={{ maxWidth: "50%" }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3">Login</h1>
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
    </PageLayout>
  );
};

export default Login;
