import React from "react";
import "./style.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalState";


const Footer = () => {
  const [, dispatch] = useGlobalContext();

  //handle a logout
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGOUT" });
    //remove userInfo from localStorage
    localStorage.removeItem("userInfo");
  };

  return (
    <footer>
      <Container className="footer" fluid={true}>
        <Row>
          <Col xl={6}>
            Copyright © 2021-{new Date().getFullYear()}{" "}
            <strong>Team ABC</strong>
          </Col>
          <Col xl={6}>
            <Button variant="primary" type="submit" onClick={handleLogout}>
              LogOut
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
