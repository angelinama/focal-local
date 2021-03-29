import React from "react";
import TaskCard from "../TaskCard";

const AllTasks = ({ filteredTasks, tasksIPosted, tasksIGot }) => {
  return (
    <div>
      {filteredTasks.map((task) => {
        return <TaskCard task={task} key={task._id} tasksIPosted={tasksIPosted} tasksIGot={tasksIGot}/>;
      })}
    </div>
  );
};

export default AllTasks;
