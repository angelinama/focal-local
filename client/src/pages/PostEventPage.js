import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const PostEvent = (props) => {
  const summaryRef = useRef("");
  const descriptionRef = useRef("");
  const startRef = useRef();
  const endRef = useRef();
  const locRef = useRef("");

  const handleEventSubmit = (e) => {
    //format the event object
    e.preventDefault();

    if (!startRef.current.value || !endRef.current.value) {
      alert("start/end time cannot be empty!");
      return;
    } else if (!summaryRef.current.value) {
      alert("event title is required");
      return;
    } else if (startRef.current.value > endRef.current.value) {
      alert("End Time should be greater than Start Time");
      return;
    }

    const timeZoneOffset = new Date().getTimezoneOffset() / 60;
    //only required if you are using recurrent events, etc
    const timeZone =
      timeZoneOffset > 0
        ? `GMT-0${timeZoneOffset}00`
        : `GMT+0${timeZoneOffset}00`;
    const event = {
      summary: summaryRef.current.value,
      location: locRef.current.value,
      description: descriptionRef.current.value,
      start: {
        dateTime: new Date(startRef.current.value),
        timeZone: timeZone,
      },
      end: {
        dateTime: new Date(endRef.current.value),
        timeZone: timeZone,
      },
      //   recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    };

    props.handleSubmit(event);
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-2">
        <h1>Post a new event</h1>
      </Row>

      <Row className="justify-content-md-center">
        <Form>
          <Form.Group controlId="eventTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Easter brunch"
              required
              ref={summaryRef}
            />
          </Form.Group>
          <Form.Group controlId="eventSummary">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="a community Easter brunch on Sunday morning"
              ref={descriptionRef}
            />
          </Form.Group>
          <Form.Group controlId="eventStart">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              min={new Date().toLocaleString()}
              required
              ref={startRef}
            />
          </Form.Group>
          <Form.Group controlId="eventEnd">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              min={new Date().toLocaleString()}
              required
              ref={endRef}
            />
          </Form.Group>
          <Form.Group controlId="eventLocation">
            <Form.Label>Location (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="xxx sample street, New York, NY 10001"
              ref={locRef}
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="float-right"
            onClick={(e) => handleEventSubmit(e)}
          >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default PostEvent;
