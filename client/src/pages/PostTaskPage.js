import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import moment from "moment";
import NavTabs from "../components/NavBar";
import Wrapper from "../components/Wrapper";



const options = ["Home repairs", "Shopping", "Baby sitting", "Pet sitting"];

const errorMessage = ({ type, minLength = 0, maxLength = 0 }) => {
  const messages = {
    required: "This is required",
    minLength: `Please enter at least ${minLength} charaters`,
    maxLength: `Please enter at most ${maxLength} charaters`,
  };
  return messages[type];
};

const PostTaskPage = () => {
  
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data)

    const startMoment = moment(`${data.startdate} ${data.starttime}`, "YYYY-MM-DD HH:mm");
    console.log(startMoment.toISOString());

    const endMoment = moment(`${data.enddate} ${data.endtime}`, "YYYY-MM-DD HH:mm");
    console.log(endMoment.toISOString());

  };

  console.log({ watch, errors });

  return (
    <>
      <NavTabs />
      <Wrapper>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <Form onSubmit= {handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <select name="category" ref={register}>
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {/* TITLE */}
            <input
              name="title"
              defaultValue=""
              placeholder="Plant rose gargen"
              ref={register({ required: true, maxLength: 50, minLength: 8 })}
              className={errors.title ? "error" : ""}
            />
            {errors.title &&
              errorMessage({
                type: errors?.title?.type,
                minLength: 8,
                maxLength: 50,
              })}
            {/* DESCRIPTION  */}
            <input
              name="description"
              ref={register({ required: true, maxLength: 250, minLength: 20 })}
              className={errors.description ? "error" : ""}
            />
            {/* errors will return when field validation fails  */}
            {errors.description &&
              errorMessage({
                type: errors?.description?.type,
                minLength: 20,
                maxLength: 250,
              })}

            {/* PAY RATE  */}
            <input
              name="payrate"
              ref={register({ required: true })}
              className={errors.payrate ? "error" : ""}
            />
            {/* errors will return when field validation fails  */}
            {errors.payrate &&
              errorMessage({
                type: errors?.payrate?.type,
              })}

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


            <Button type="submit" > Submit </Button>
          </Form>
        </Wrapper>
      </>
  );
};

export default PostTaskPage;
