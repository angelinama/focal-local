import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import TaskDetails from "../components/TaskDetails";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/TaskDetails.css";

const TaskDetailsPage = () => {
  //Attach authentication token to api request
  const [state] = useGlobalContext();
  if (state.userToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.userToken}`;
  }

  const { id } = useParams();
  console.log(id);
  const [task, setTask] = useState(null);
  const [user, setUser] = useState(null);
  const [goToMyBoard, setGoToMyBoard] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/task/${id}`)
      .then((res) => {
        setTask(res.data);

        console.log(res.data);
        axios
          .get(`/api/user/${res.data.posterId}`)
          .then((res) => {
            console.log({ user: res });
            setUser(res.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!task && !user) {
    return "Loading...";
  }
  console.log(user);

  const handleClick = () => {
    console.log("handleClick", id);
    axios
      .post(`/api/task/assignTask/${id}`)
      .then((res) => {
        console.log(res.data);
        setGoToMyBoard(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="maincontainer">
      <Row>
        <div className="push">
          <Col>
            <h1 className="display-5 headline">Task Details</h1>
          </Col>
        </div>
      </Row>
      <Row>
        <div className="push">
          <Col>
            <TaskDetails task={task} postedBy={user?.userName} />
          </Col>
        </div>
      </Row>
      <div className="push">
        <Row>
          <Col>
            <Button onClick={handleClick}>GET THE TASK</Button>
          </Col>
          <Col>
            <Button href={`mailto: ${user?.email}`}>ASK A QUESTION</Button>
            {goToMyBoard && <Redirect to="/myboard" />}
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <div className="footerpush"></div>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskDetailsPage;
