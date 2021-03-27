import React from "react";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

const TaskCard = ({ task, postedBy }) => {
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

          {postedBy && <p>Posted by {postedBy}</p>}

          {!postedBy && <LinkContainer to={`/details/${task._id}`}>
          <Card.Link>
            Details
          </Card.Link>
          </LinkContainer>}


          
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
