import React from "react";
import TaskCard from "../TaskCard";
import Row from "react-bootstrap/Row";

const AllTasks = ({ filteredTasks, tasksIPosted, tasksIGot, onComplete }) => {
  return (
    <Row xs={1} md={2} lg={4}>
      {filteredTasks.map((task) => {
        return <TaskCard onComplete={onComplete} task={task} key={task._id} tasksIPosted={tasksIPosted} tasksIGot={tasksIGot}/>;
      })}
    </Row>
  );
};

export default AllTasks;
