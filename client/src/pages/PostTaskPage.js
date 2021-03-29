import React, { useState, useRef } from "react";
import { Form, Button, InputGroup, Overlay, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import moment from "moment";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalState";
import swal from "sweetalert";
import "../styles/PostTask.css";

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
  //Attach authentication token to api request
  const [state] = useGlobalContext();
  if (state.userToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.userToken}`;
  }
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const onSubmit = (data) => {
    console.log("submit data: ", data);
    //convert date into string
    const startMoment = moment(
      `${data.startdate} ${data.starttime}`,
      "YYYY-MM-DD HH:mm"
    );
    console.log(startMoment.toISOString());
    data.startdate = startMoment;

    const endMoment = moment(
      `${data.enddate} ${data.endtime}`,
      "YYYY-MM-DD HH:mm"
    );
    console.log(endMoment.toISOString());
    data.enddate = endMoment;

    data.email = JSON.parse(localStorage.getItem("userInfo")).email;
    //api call
    setShow(false);
    axios
      .post("/api/task", data)
      .then(() => {
        console.log("axios called");
        reset();
        setShow(true);
      })
      .catch(() => {
        swal("Oops!", "...Your task could not be added!");
      });
  };
  //*****end date conversion*******/

  // console.log('Errors watch', {errors, watch} );

  return (
    <Wrapper>
      <Container>
        <Row>
          <h1 className="display-5 headline">Post a Task</h1>
        </Row>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Form.Group controlId="formCategory">
            <Form.Label>Choose a category</Form.Label>
            <Form.Control as="select" name="category" ref={register}>
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* TITLE */}
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              defaultValue=""
              placeholder="Plant rose garden"
              ref={register({ required: true, maxLength: 50, minLength: 8 })}
              className={errors.title ? "error" : ""}
            />
            {errors.title &&
              errorMessage({
                type: errors?.title?.type,
                minLength: 8,
                maxLength: 50,
              })}
          </Form.Group>
          {/* DESCRIPTION  */}
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              ref={register({
                required: true,
                maxLength: 250,
                minLength: 20,
              })}
              className={errors.description ? "error" : ""}
            />
            {/* errors will return when field validation fails  */}
            {errors.description &&
              errorMessage({
                type: errors?.description?.type,
                minLength: 20,
                maxLength: 250,
              })}
          </Form.Group>
          {/* PAY RATE  */}
          <Form.Group controlId="formPayRate">
            <Form.Label>How much will you pay?</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                name="payrate"
                ref={register({ required: true })}
                className={errors.payrate ? "error" : ""}
              />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {/* errors will return when field validation fails  */}
            {errors.payrate &&
              errorMessage({
                type: errors?.payrate?.type,
              })}
          </Form.Group>
          <Form.Row>
            {/* START DATE  */}
            <Form.Group as={Col} controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
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
            </Form.Group>
            <Form.Group as={Col} controlId="formEndDate">
              {/* END DATE  */}
              <Form.Label>End Date</Form.Label>
              <Form.Control
                name="enddate"
                type="date"
                ref={register({ required: false })}
                className={errors.enddate ? "error" : ""}
              />
              {/* errors will return when field validation fails  */}
              {errors.enddate &&
                errorMessage({
                  type: errors?.enddate?.type,
                })}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            {/* START TIME  */}
            <Form.Group as={Col} controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
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
            </Form.Group>
            <Form.Group as={Col} controlId="formEndTime">
              {/* END TIME  */}
              <Form.Label>End Time</Form.Label>
              <Form.Control
                name="endtime"
                type="time"
                ref={register({ required: false })}
                className={errors.endtime ? "error" : ""}
              />
              {/* errors will return when field validation fails  */}
              {errors.endtime &&
                errorMessage({
                  type: errors?.endtime?.type,
                })}
            </Form.Group>
          </Form.Row>

          <Button
            className="posttaskbtn"
            type="submit"
            ref={target}
            onClick={() => setShow(!show)}
          >
            {" "}
            Submit{" "}
          </Button>
          {/* --- */}
          {show && (
            <Overlay target={target.current} show={show} placement="right">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  Task Saved!
                </Tooltip>
              )}
            </Overlay>
          )}
          {/* --- */}
        </Form>
      </Container>
    </Wrapper>
  );
};

export default PostTaskPage;
