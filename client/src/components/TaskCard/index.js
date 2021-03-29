import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import AnimatedCard from "../AnimatedCard"
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

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
        // <AnimatedCard>
          <Card>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {task.category}
              </Card.Subtitle>
              <Card.Text>{task.description.substr(0,35)} ...</Card.Text>

              <Card.Text>{date}</Card.Text>

              {postedBy && <p>Posted by {postedBy}</p>}

              {!postedBy && (
                <LinkContainer to={`/details/${task._id}`}>
                  <Card.Link>Details</Card.Link>
                </LinkContainer>
              )}
              {tasksIPosted && (
                <Button onClick={() => handleClick(task._id)}>
                  DELETE TASK
                </Button>
              )}
              { tasksIGot && (
                <Button onClick={() => handleComplete(task._id)}>
                  COMPLETE
                </Button>
              )}
            </Card.Body>
          </Card>
        // </AnimatedCard>
      )}
    </>
  );
};

export default TaskCard;
