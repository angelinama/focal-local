import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

const TaskCard = ({ task, postedBy, tasksIPosted }) => {
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

  let date = new Date(task.startdate);
  date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  return (
    <>
      {hide ? null : (
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {task.category}
              </Card.Subtitle>
              <Card.Text>{task.description}</Card.Text>

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
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default TaskCard;
