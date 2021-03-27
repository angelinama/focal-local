import React from "react";
import TaskCard from "../TaskCard";

const AllTasks = ({ filteredTasks }) => {
  return (
    <div>
      {filteredTasks.map((task) => {
        return <TaskCard task={task} key={task._id} />;
      })}
    </div>
  );
};

export default AllTasks;
