import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import moment from "moment";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCheckSquare,
  faForward,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const TaskCard = ({ task, postedBy, tasksIPosted, tasksIGot, onComplete }) => {
  //hook for deleted tasks
  const [hide, setHide] = useState(false);

  const handleClick = (taskID) => {
    axios
      .delete(`/api/task/${taskID}`)
      .then((res) => {
        setHide(true);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleComplete = (taskID) => {
    axios
      .get(`/api/task/complete/${taskID}`)
      .then((res) => {
        setHide(true);
        console.log(res.data);
        onComplete();
      })
      .catch((error) => console.log(error));
  }; 

  let date = moment(new Date(task.startdate)).format(
    "MMMM Do, YYYY");

  return (
    <>
      {hide ? null : (
        <div>
          <Card className="taskcard">
            <Card.Header className="mb-2 text-muted">
              {task.category}
            </Card.Header>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Subtitle className="text-muted">
                {task.description.substr(0, 20)} ...
              </Card.Subtitle>

              <Card.Text>
                <FontAwesomeIcon icon={faCalendarCheck} />
                &nbsp;{date}
              </Card.Text>

              {postedBy && <p>Posted by {postedBy}</p>}
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col className="cfleft">
                  {tasksIPosted && !task.completed && (
                    <Button
                      className="leftBtn deleteBtn"
                      variant="link"
                      onClick={() => handleClick(task._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                      &nbsp; Delete
                    </Button>
                  )}
                  {tasksIGot && (
                    <Button
                      className="leftBtn completeBtn"
                      variant="link"
                      onClick={() => handleComplete(task._id)}
                    >
                      <FontAwesomeIcon icon={faCheckSquare} />
                      &nbsp; Complete
                    </Button>
                  )}
                </Col>
                <Col className="cfright">
                  {!postedBy && (
                    <Button className="rightBtn" variant="link">
                      <LinkContainer to={`/details/${task._id}`}>
                        <Card.Link>
                          Details <FontAwesomeIcon icon={faForward} />
                        </Card.Link>
                      </LinkContainer>
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
};

export default TaskCard;
