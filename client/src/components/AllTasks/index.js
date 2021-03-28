import React from "react";
import TaskCard from "../TaskCard";

const AllTasks = ({ filteredTasks, tasksIPosted }) => {
  return (
    <div>
      {filteredTasks.map((task) => {
        return <TaskCard task={task} key={task._id} tasksIPosted={tasksIPosted}/>;
      })}
    </div>
  );
};

export default AllTasks;
