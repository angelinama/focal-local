import React from "react";
import TaskCard from "../TaskCard";
import Row from "react-bootstrap/Row";

const AllTasks = ({ filteredTasks, tasksIPosted, tasksIGot }) => {
  return (
    <Row xs={1} md={2} lg={4}>
      {filteredTasks.map((task) => {
        return (
          <TaskCard
            task={task}
            key={task._id}
            tasksIPosted={tasksIPosted}
            tasksIGot={tasksIGot}
          />
        );
      })}
    </Row>
  );
};

export default AllTasks;
