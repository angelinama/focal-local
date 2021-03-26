import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

const UnauthenticatedApp = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  //TODO make two components for both login and signup
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="username@sample.com"
          name="email"
          ref={emailRef}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPhone">
        <Form.Label>Phone number (optional)</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          placeholder="123-456-7890"
          ref={phoneRef}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>
      {/* <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Save my email" />
      </Form.Group> */}
      <Button variant="primary" type="submit" onClick={handleLogin}>
        Submit
      </Button>
    </Form>
  );
};

export default UnauthenticatedApp;
