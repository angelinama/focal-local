import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnimatedCard from "../AnimatedCard"
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";



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

  let date = new Date(task.startdate);
  date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  return (
    <>
      {hide ? null : (
        <div>
          {/* <AnimatedCard> */}
          <Card className="taskcard">
            <Card.Header className="mb-2 text-muted">
              {task.category}
            </Card.Header>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description.substr(0, 20)} ...</Card.Text>

              <Card.Text>{date}</Card.Text>

              {postedBy && <p>Posted by {postedBy}</p>}
            </Card.Body>
            <Card.Footer>
              {!postedBy && (
                <LinkContainer to={`/details/${task._id}`}>
                  <Card.Link>
                    Details <FontAwesomeIcon icon={faForward} />
                  </Card.Link>
                </LinkContainer>
              )}
              {tasksIPosted && !task.completed && (
                <Button onClick={() => handleClick(task._id)}>
                  DELETE TASK
                </Button>
              )}
              {tasksIGot && (
                <Button onClick={() => handleComplete(task._id)}>
                  COMPLETE
                </Button>
              )}
            </Card.Footer>
          </Card>
          {/* </AnimatedCard> */}
        </div>
      )}
    </>
  );
};

export default TaskCard;
