import React, { useEffect, useState } from "react";
import AllTasks from "../components/AllTasks";
import MyPieChart from "../components/Stats/MyPieChart";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../components/Wrapper";
import "../styles/MyBoard.css";

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
    <Container fluid>
      <Row>
        <div className="push">
          <Col>
            <h1 className="display-5 headline">My Task Board</h1>
          </Col>
        </div>
      </Row>
      <Row>
        <div className="push">
          <Col>
            <MyPieChart data={myCompletedTasks} />
          </Col>
        </div>
      </Row>
      <Row className="taskget">
        <Col>
          <h2>I Am Working On</h2>
          <AllTasks
            onComplete={updateMyBoardPage}
            filteredTasks={myAssignments}
            tasksIGot
          />
        </Col>
      </Row>
      <Row className="taskpost">
        <Col>
          <h2>I Need Help</h2>
          <AllTasks filteredTasks={myTasks} tasksIPosted />
        </Col>
      </Row>
      <Row className="taskdone">
        <Col>
          <h2>I Got Help</h2>
          <AllTasks filteredTasks={tasksIGotHelpWith} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyBoardPage;
