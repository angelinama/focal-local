import React from "react";
import Card from "react-bootstrap/Card";
import AnimatedCard from "../AnimatedCard"
import { LinkContainer } from "react-router-bootstrap";
// import moment from "moment";

const TaskCard = ({ task, postedBy }) => {
  let date = new Date(task.startdate);
  date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  return (
    <AnimatedCard>
      <Card>
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
        </Card.Body>
      </Card>
    </AnimatedCard>
  );
};

export default TaskCard;
