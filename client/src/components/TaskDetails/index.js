import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";

const TaskDetails = ({ task, postedBy, tasksIPosted }) => {
  //hook for deleted tasks
  const [hide] = useState(false);

  let startdate = moment(new Date(task.startdate)).format(
    "MMMM Do YYYY, h:mm a"
  );

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
              <Card.Text>Description: {task.description}</Card.Text>
              <Card.Text>Pay Rate: ${task.payrate}</Card.Text>
              <Card.Text>Starting: {startdate}</Card.Text>
              {enddate &&
              <Card.Text>Ending: {enddate}</Card.Text>
              }

              {postedBy && <p>Posted by {postedBy}</p>}

            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default TaskDetails;
