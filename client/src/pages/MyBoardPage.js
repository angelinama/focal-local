import React, { useEffect, useState } from "react";
import AllTasks from "../components/AllTasks";
import MyPieChart from "../components/Stats/MyPieChart";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";

const MyBoardPage = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [tasksIGotHelpWith, setTasksIGotHelpWith] = useState([]);
  const [myCompletedTasks, setmyCompletedTasks] = useState([]);
  const [state] = useGlobalContext();

  if (state.userToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.userToken}`;
  }
  const updateMyBoardPage = () => {
    axios
      .get("/api/task/myboard/postedbyme")
      .then((response) => {
        console.log(response.data);
        setMyTasks(response.data.filter((task) => !task.completed));
        setTasksIGotHelpWith(response.data.filter((task) => task.completed));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    axios
      .get("/api/task/myboard/assignedtome")
      .then((response) => {
        const assignedToMe = response.data.filter((task) => !task.completed);
        const completedByMe = response.data.filter((task) => task.completed);
        console.log(response.data);
        //find # occurences per category
        let NumOfOccurrences = {};
        completedByMe.forEach((task) => {
          const cat = task.category.replace(" ", "_");
          if (NumOfOccurrences[cat]) {
            NumOfOccurrences[cat] = NumOfOccurrences[cat] + 1;
          } else {
            NumOfOccurrences[cat] = 1;
          }
        });
        console.log({ NumOfOccurrences });
        let pieChartData = [["Categories", "Completed"]];
        Object.keys(NumOfOccurrences).forEach((key) => {
          const keyStr = key.replace("_", " ");
          pieChartData.push([keyStr, NumOfOccurrences[key]]);
        });
        console.log({ pieChartData });
        setMyAssignments(assignedToMe);
        setmyCompletedTasks(pieChartData);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(updateMyBoardPage, []);

  return (
    <div>
      <h1>*** My Board Page ***</h1>
      <MyPieChart data={myCompletedTasks} />
      <h2>Task I Am Working On</h2>
      <AllTasks onComplete={updateMyBoardPage} filteredTasks={myAssignments} tasksIGot />
      <h2>Tasks I Need Help With</h2>
      <AllTasks filteredTasks={myTasks} tasksIPosted />
      <h2>Tasks I Got Help With</h2>
      <AllTasks filteredTasks={tasksIGotHelpWith}/>
    </div>
  );
};

export default MyBoardPage;
