import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import generateGoogleToken from "../utils/googleToken";
import PostEvent from "./PostEventPage";
import axios from "axios";
require("dotenv").config();

const Events = () => {
  const gapi = window.gapi;

  //consts need to user google calendar API
  const calendarId = process.env.REACT_APP_CALENDAR_ID;

  const [accessToken, setAccessToken] = useState("");
  //TODO instead of run everytime, check the expiration time so that it won't get run every time refresh the page
  useEffect(() => {
    generateGoogleToken((token) => {
      setAccessToken(token.access_token);
      //TODO to delete this if only using Google client Library solution
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.access_token}`;
    });
  }, []);

  useEffect(() => {
    //It won't run when page load but will run until the accessToken is set
    if (accessToken) {
      gapi.load("client:auth2", initClient);
    }

    function initClient() {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_APIKey,
          clientId: process.env.REACT_APP_CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: process.env.REACT_APP_SCOPES,
        })
        .then(
          function () {
            gapi.client.setToken({ access_token: accessToken });
            // console.log(gapi.client.getToken());
            listUpcomingEvents();
          },
          function (error) {
            console.log(error);
          }
        );
    }

    //TODO change this function to display upcoming events on page instead of console
    function listUpcomingEvents() {
      gapi.client.calendar.events
        .list({
          calendarId: process.env.REACT_APP_CALENDAR_ID,
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 20,
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
  }, [accessToken, gapi]);

  const postNewEvent = (event) => {
    console.log(event);
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

  // REST API solution by using axios
  // const postRequest = (event) => {
  //   console.log(accessToken.access_token);
  //   console.log(axios.defaults.headers);
  //   axios
  //     .post(
  //       `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
  //       event
  //     )
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div>
      <PostEvent handleSubmit={postNewEvent}></PostEvent>
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
