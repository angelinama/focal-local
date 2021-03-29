import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
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
  const event = {
    summary: "Focal local test event",
    location: "215 1st Ave W, Seattle, WA 98119",
    description: "Angelina's test events",
    start: {
      dateTime: "2021-03-31T10:00:00-07:00", //ISOString using Date
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2021-03-31T12:00:00-07:00",
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

  useEffect(() => {
    //TODO instead of run everytime, check the expiration time
    generateGoogleToken(setAccessToken);

    // gapi.client.setToken({ access_token: accessToken });

    function initClient() {
      gapi.client
        .init({
          apiKey: APIKey,
          clientId: ClientId,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: SCOPES,
        })
        .then(
          function () {
            // Listen for sign-in state changes.
            gapi.auth2
              .getAuthInstance()
              .signIn()
              .then(() => {
                updateSigninStatus(
                  gapi.auth2.getAuthInstance().isSignedIn.get()
                );
              });
          },
          function (error) {
            appendPre(JSON.stringify(error, null, 2));
          }
        );
    }

    gapi.load("client:auth2", initClient);
  }, [gapi]);

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      listUpcomingEvents();
    } else {
      gapi.client.setToken({ access_token: accessToken });
    }
  }

  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  function appendPre(message) {
    var pre = document.getElementById("content");
    var textContent = document.createTextNode(message + "\n");
    pre.appendChild(textContent);
  }

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
        appendPre("Upcoming events:");

        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            appendPre(event.summary + " (" + when + ")");
          }
        } else {
          appendPre("No upcoming events found.");
        }
      });
  }

  const postNewEvent = () => {
    const request = gapi.client.calendar.events.insert({
      calendarId: calendarId,
      resource: event,
    });

    request.execute(function (event) {
      appendPre("Event created: " + event.htmlLink);
    });
  };
  return (
    <div>
      <Button variant="success" onClick={postNewEvent}>
        Post a test Event
      </Button>{" "}
      <p>Google Calendar API Quickstart</p>
      {/* <Button onClick={handleAuthClick}>Authorize</Button> */}
      <Button onClick={handleSignoutClick}>Sign Out Google account</Button>
      <h1>***** Where the event lists goes later</h1>
      <pre id="content" style={{ whiteSpace: "pre-wrap" }}></pre>
      {/* TODO best practice to add iframe */}
      <iframe
        src="https://calendar.google.com/calendar/embed?src=j9h0hs9rah1jb53i8hrgurumr0%40group.calendar.google.com&ctz=America%2FLos_Angeles"
        style={{ border: "0" }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="eventCalendar"
      ></iframe>
    </div>
  );
};

export default Events;
