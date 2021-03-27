import React from "react";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

const TaskCard = ({ task }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {task.category}
          </Card.Subtitle>
          <Card.Text>
          {task.description}
          </Card.Text>

          <LinkContainer to={`/details/${task._id}`}>
          <Card.Link>
            Details
          </Card.Link>
          </LinkContainer>

          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
