import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

const UnauthenticatedApp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  //Get the context reducer
  const [state, dispatch] = useGlobalContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    const inputs = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
    };
    // console.log(inputs);
    //send axios request to /auth/login
    const {
      data: { email, token },
    } = await axios.post("/auth/login", inputs);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        email,
        token,
      })
    );
    dispatch({
      type: "LOGIN",
      email,
      token,
    });
  };

  //TODO make two components for both login and signup
  return (
    <>
      <NavBar>
      </NavBar>
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

export default UnauthenticatedApp;
