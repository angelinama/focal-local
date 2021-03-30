import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import generateGoogleToken from "../utils/googleToken";
require("dotenv").config();

const Events = () => {
  const gapi = window.gapi;

  //consts need to user google calendar API
  const APIKey = process.env.REACT_APP_APIKey;
  const ClientId = process.env.REACT_APP_CLIENT_ID;
  const calendarId = process.env.REACT_APP_CALENDAR_ID;
  const SCOPES = process.env.REACT_APP_SCOPES;

  //TODO delete this and get data from a form
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 2);
  const event = {
    summary: "Focal local test event",
    location: "215 1st Ave W, Seattle, WA 98119",
    description: "Angelina's test events",
    start: {
      dateTime: new Date().toISOString(), //ISOString using Date
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles",
    },
    // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    // attendees: [],
    // reminders: {
    //   useDefault: false,
    //   overrides: [
    //     { method: "email", minutes: 24 * 60 },
    //     { method: "popup", minutes: 10 },
    //   ],
    // },
  };

  const [accessToken, setAccessToken] = useState("");
  //TODO instead of run everytime, check the expiration time so that it won't get run every time refresh the page
  useEffect(() => {
    generateGoogleToken(setAccessToken);
  }, []);

  useEffect(() => {
    //It won't run when page load but will run until the accessToken is set
    if (accessToken) {
      gapi.load("client:auth2", initClient);
    }

    function initClient() {
      gapi.client
        .init({
          apiKey: APIKey,
          clientId: ClientId,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: SCOPES,
          accessToken: accessToken,
        })
        .then(
          function () {
            console.log(gapi.client.getToken());
            listUpcomingEvents();
          },
          function (error) {
            console.log(error);
          }
        );
    }
  }, [accessToken]);

  // function appendPre(message) {
  //   var pre = document.getElementById("content");
  //   var textContent = document.createTextNode(message + "\n");
  //   pre.appendChild(textContent);
  // }

  function listUpcomingEvents() {
    gapi.client.calendar.events
      .list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response) {
        var events = response.result.items;
        console.log("Upcoming events:");

        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            console.log(event.summary + " (" + when + ")");
          }
        } else {
          console.log("No upcoming events found.");
        }
      });
  }

  const postNewEvent = () => {
    const request = gapi.client.calendar.events.insert({
      calendarId: calendarId,
      resource: event,
    });

    request.execute(function (event) {
      if (event.htmlLink) {
        console.log("Event created: " + event.htmlLink);
      } else {
        alert(
          "something went wrong when trying to create events on Google Calendar"
        );
      }
    });
  };
  return (
    <div>
      <Button variant="success" onClick={postNewEvent}>
        Post a test Event
      </Button>{" "}
      {/* <h1>***** Where the event lists goes later</h1> */}
      <Container>
        <Row className="justify-content-md-center">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=j9h0hs9rah1jb53i8hrgurumr0%40group.calendar.google.com&ctz=America%2FLos_Angeles"
            style={{ border: "0" }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="eventCalendar"
          ></iframe>
        </Row>
      </Container>
    </div>
  );
};

export default Events;
