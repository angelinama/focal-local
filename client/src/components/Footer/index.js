import React from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalState";
import { Button } from "react-bootstrap";

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
          <Col>
            <ul className="navbar-nav nav-group ml-auto ">
              <li className="nav-item">
                <Button
                  variant="link"
                  onClick={handleLogout}
                  className="nav-link float-right"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
