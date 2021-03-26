import React, { useState, useEffect } from "react";
import TaskCard from "../TaskCard";

const AllTasks = ({ filteredTasks, taskList, setFilteredTasks }) => {
  return (
    <div>
      {filteredTasks.map((task) => {
        return <TaskCard task={task} />;
      })}
    </div>
  );
};

export default AllTasks;
