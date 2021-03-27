import React, {useEffect, useState} from 'react'
import AllTasks from '../components/AllTasks'
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";

const MyBoardPage = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [state] = useGlobalContext();

  if (state.userToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.userToken}`;
  }

  useEffect(() => {
    axios
      .get("/api/task/myboard/postedbyme")
      .then((response) => {
        console.log(response.data)
        setMyTasks(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

      axios
      .get("/api/task/myboard/assignedtome")
      .then((response) => {
        console.log(response.data)
        setMyAssignments(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);


  return (
    <div>
      <h1>*** My Board Page ***</h1>
      <h2>My Tasks</h2>
      <AllTasks filteredTasks={myTasks}/>
      <h2>My Requests</h2>
      <AllTasks filteredTasks={myAssignments}/>
    </div>
  )
}

export default MyBoardPage
