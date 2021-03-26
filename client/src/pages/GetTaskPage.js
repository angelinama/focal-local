import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import NavTabs from "../components/NavBar";
import { Form, Button } from "react-bootstrap";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import AllTasks from "../components/AllTasks";

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
    console.log(data);
    let results = taskList.filter((task) => {
      return task.category === data.category;
    });

    setFilteredTasks(results);
  };

  console.log({ watch, errors });

  return (
    <>
      <NavTabs />
      <Wrapper>
        <h1>***GET A TASK PAGE***</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <select name="category" ref={register}>
            {options.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          {/* START DATE  */}
          <input
            name="startdate"
            type="date"
            ref={register({ required: true })}
            className={errors.startdate ? "error" : ""}
          />
          {/* errors will return when field validation fails  */}
          {errors.startdate &&
            errorMessage({
              type: errors?.startdate?.type,
            })}

          {/* END DATE  */}
          <input
            name="enddate"
            type="date"
            ref={register({ required: true })}
            className={errors.enddate ? "error" : ""}
          />
          {/* errors will return when field validation fails  */}
          {errors.enddate &&
            errorMessage({
              type: errors?.enddate?.type,
            })}

          {/* START TIME  */}
          <input
            name="starttime"
            type="time"
            ref={register({ required: true })}
            className={errors.starttime ? "error" : ""}
          />
          {/* errors will return when field validation fails  */}
          {errors.starttime &&
            errorMessage({
              type: errors?.starttime?.type,
            })}

          {/* END TIME  */}
          <input
            name="endtime"
            type="time"
            ref={register({ required: true })}
            className={errors.endtime ? "error" : ""}
          />
          {/* errors will return when field validation fails  */}
          {errors.endtime &&
            errorMessage({
              type: errors?.endtime?.type,
            })}

          <Button type="submit"> Submit </Button>
        </Form>
      </Wrapper>

      <AllTasks
        taskList={taskList}
        filteredTasks={filteredTasks}
        setFilteredTasks={setFilteredTasks}
      />
    </>
  );
};

export default GetTaskPage;
