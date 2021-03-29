import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import moment from "moment";

const TaskDetails = ({ task, postedBy, tasksIPosted }) => {
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

  let startmoment = moment(new Date(task.startdate)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  let endmoment = moment(new Date(task.startdate)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <>
      {hide ? null : (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {task.category}
              </Card.Subtitle>
              <Card.Text>{task.description}</Card.Text>
              <p>Start</p>
              <Card.Text>{startmoment}</Card.Text>
              <p>End</p>
              <Card.Text>{endmoment}</Card.Text>

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
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default TaskDetails;
