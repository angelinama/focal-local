import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import TaskCard from "../components/TaskCard";


const TaskDetailsPage = () => {
  //Attach authentication token to api request
  const [state] = useGlobalContext();
  if (state.userToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.userToken}`;
  }

  const { id } = useParams();
  console.log(id);
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/task/${id}`)
      .then((res) => setTask(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  if(!task){
    return "Loading...";
  }

  return (
    <div>
      <h1>*** Details Page ***</h1>
      <TaskCard task={task}/>
    </div>
  );
};

export default TaskDetailsPage;
