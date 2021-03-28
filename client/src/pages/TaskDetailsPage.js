import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import TaskCard from "../components/TaskCard";
import Wrapper from "../components/Wrapper";
import Button from "react-bootstrap/Button";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/task/${id}`)
      .then((res) => {
        setTask(res.data);

        console.log(res.data);
        axios
          .get(`/api/user/${res.data.posterId}`)
          .then((res) => {
            console.log({ user: res });
            setUser(res.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!task && !user) {
    return "Loading...";
  }
  console.log(user);

  const handleClick = ()=>{
    console.log("handleClick", id);
    axios
      .post(`/api/task/assignTask/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Wrapper>
        <h1>*** Task Details Page ***</h1>
        <TaskCard task={task} postedBy={user?.userName}/>

        <Button onClick={handleClick}>GET THE TASK</Button>
        <Button href={`mailto: ${user?.email}`}>ASK A QUESTION</Button>
      </Wrapper>
    </>
  );
};

export default TaskDetailsPage;
