import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import NavBar from "./NavBar";
import Wrapper from "./Wrapper";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false); //state to keep track of login or register
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const userNameRef = useRef();

  //Get the context reducer
  const [, dispatch] = useGlobalContext();

  const handleRegister = (event) => {
    event.preventDefault();
    const inputs = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      userName: userNameRef.current.value,
    };

    axios.post("/auth/register", inputs).then(({ data }) => {
      if ("err" in data) {
        console.log(data);
        alert(data.message);
        return;
      }
      const {
        user: { email },
      } = data;
      //Technically we don't need this dispatch cuz there is no place to actually call this but setting up email in globalState will help later if we want do something like checkbox "save my email for future login, etc"
      dispatch({
        type: "REGISTER",
        email,
      });
      setIsRegister(false);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const inputs = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // console.log(inputs);
    //send axios request to /auth/login
    //TODO handle error during login
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

  return (
    <>
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
        {isRegister ? (
          <>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone number (optional)</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="123-456-7890"
                ref={phoneRef}
              />
            </Form.Group>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                placeholder="contains only letters and numbers"
                ref={userNameRef}
              />
            </Form.Group>
          </>
        ) : (
          <div></div>
        )}
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
        <Button
          variant="primary"
          type="submit"
          onClick={isRegister ? handleRegister : handleLogin}
        >
          Submit
        </Button>
      </Form>
      <hr></hr>
      {/* conditional rendering a link to sign up in login page and vise versa */}
      {!isRegister ? (
        <p>
          No account yet?{" "}
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setIsRegister(true);
            }}
          >
            Sign up
          </a>{" "}
          instead
        </p>
      ) : (
        <p>
          Already signed up?{" "}
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setIsRegister(false);
            }}
          >
            Log in
          </a>{" "}
        </p>
      )}
    </>
  );
};

export default UnauthenticatedApp;
