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

  let startdate = moment(new Date(task.startdate)).format(
    "MMMM Do YYYY, h:mm a"
  );

  // let someVar = condition ? returned if true : returned if false

  let enddate = task.enddate ? moment(new Date(task.enddate))
    .format("MMMM Do YYYY, h:mm a") : null;

  return (
    <>
      {hide ? null : (
        <>
          <Card>
            <Card.Header>{task.category}</Card.Header>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>Starting: {startdate}</Card.Text>
              <Card.Text>Ending: {enddate}</Card.Text>

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