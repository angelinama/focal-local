import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import AllTasks from "../components/AllTasks";
import { useGlobalContext } from "../context/GlobalState";
import "../styles/GetTask.css";
import { isMyTask } from "../utils";

const options = ["Home repairs", "Shopping", "Baby sitting", "Pet sitting"];

const errorMessage = ({ type, minLength = 0, maxLength = 0 }) => {
  const messages = {
    required: "This is required",
    minLength: `Please enter at least ${minLength} charaters`,
    maxLength: `Please enter at most ${maxLength} charaters`,
  };
  return messages[type];
};

const GetTaskPage = () => {
  const { register, handleSubmit, watch, errors, reset} = useForm();
  // Tasks state
  const [taskList, setTaskList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  //Attach authentication token to api request
  const [state] = useGlobalContext();
  if (state.userToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.userToken}`;
  }

  useEffect(() => {
    axios
      .get("/api/task")
      .then((response) => {
        const othersTasks = response.data.filter((task)=>!isMyTask(task))
        // handle success
        setTaskList(othersTasks);
        setFilteredTasks(othersTasks);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  //FILTER TASKS TO FIND:
  const onSubmit = (data) => {
    console.log("logging data ", data);
    let results = taskList
      .filter((task) => {

        console.log({ task: task.category, data: data.category });
        if (!data.category.length) return true;
        return data.category.includes(task.category);
      })
      .filter((task) => {
        return data.volunteer ? task.payrate === 0 : true;
      })
      .filter((task) => {
   
        
        if(!data.startdate) return true;
        let startFilterDate = new Date(data.startdate);
        
        let taskDate = new Date(task.startdate);
      
        return taskDate.getTime() > startFilterDate.getTime();
      });
      
    setFilteredTasks(results);
    reset();
  };

  console.log({ watch, errors });

  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="display-5 headline">Get a Task</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* CATEGORY  */}
              <Form.Group controlId="category">
                <Form.Label>Choose a category</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="category"
                  ref={register}
                >
                  {options.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {/* ONLY VOLUNTEERS? */}
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  name="volunteer"
                  type="checkbox"
                  label="Find only volunteer tasks"
                  ref={register({ required: false })}
                />
              </Form.Group>
              {/* START DATE  */}
              <Form.Group id="startDate">
                <Form.Label>Select the date</Form.Label>

                <Form.Control
                  name="startdate"
                  type="date"
                  ref={register({ required: false })}
                  className={errors.startdate ? "error" : ""}
                />
            {/* errors will return when field validation fails  */}
            {errors.startdate &&
              errorMessage({
                type: errors?.startdate?.type,
              })}
          </Form.Group>
              <Button className="gettaskbtn" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="alltaskcol">
            <AllTasks
              taskList={taskList}
              filteredTasks={filteredTasks}
              setFilteredTasks={setFilteredTasks}
            />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default GetTaskPage;
