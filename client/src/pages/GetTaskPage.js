import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import AllTasks from "../components/AllTasks";
import { useGlobalContext } from "../context/GlobalState";

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
  const { register, handleSubmit, watch, errors } = useForm();
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
        // handle success
        setTaskList(response.data);
        setFilteredTasks(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    console.log({ data });
    let results = taskList
      .filter((task) => {
        console.log({ task: task.category, data: data.category });
        return data.category.includes(task.category);
      })
      .filter((task) => {
        return data.volunteer ? task.payrate === 0 : true;
      });

    setFilteredTasks(results);
  };

  console.log({ watch, errors });

  return (
    <>
      <Wrapper>
        <h1>***GET A TASK PAGE***</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* CATEGORY  */}
          <Form.Group controlId="category">
            <Form.Label>Choose a category</Form.Label>
            <Form.Control as="select" multiple name="category" ref={register}>
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

          {/* START TIME  */}
          <Form.Group>
            <Form.Label>Select the time</Form.Label>
            <Form.Control
              name="starttime"
              type="time"
              ref={register({ required: false })}
              className={errors.starttime ? "error" : ""}
            />
            {/* errors will return when field validation fails  */}
            {errors.starttime &&
              errorMessage({
                type: errors?.starttime?.type,
              })}
          </Form.Group>
          <Button type="submit"> Submit </Button>
        </Form>

        <AllTasks
          taskList={taskList}
          filteredTasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
        />
      </Wrapper>
    </>
  );
};

export default GetTaskPage;
