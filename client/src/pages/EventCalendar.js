import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
require("dotenv").config();

const Events = () => {
  const gapi = window.gapi;
  //TODO move client_id api_key to to Heroku?
  //consts need to user google calendar API
  // const APIKey = process.env.REACT_APP_APIKey;
  // const ClientId = process.env.REACT_APP_CLIENT_ID;
  // const DISCOVERY = [process.env.REACT_APP_DISCOVERY_DOCS];
  // const SCOPES = process.env.REACT_APP_SCOPES;
  // const calendarId = process.env.REACT_APP_CALENDAR_ID;

  //TODO delete this and get data from a form
  const event = {
    summary: "Focal local test event",
    location: "800 Howard St., San Francisco, CA 94103",
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: "2021-03-30T09:00:00-07:00", //ISOString using Date
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2021-03-30T17:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  // Client ID and API key from the Developer Console
  const CLIENT_ID =
    "969073501886-unqntplq1pkfiiuqg2aq5qotahklv5am.apps.googleusercontent.com";
  const API_KEY = "AIzaSyCqGIxA6yPAh_hNAHr0ctoYH2ChgQVJ3ws";

  // // Array of API discovery doc URLs for APIs used by the quickstart
  // const DISCOVERY_DOCS = [
  //   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  // ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  useEffect(() => {
    function initClient() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
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
      // authorizeButton.style.display = "none";
      // signoutButton.style.display = "block";
      listUpcomingEvents();
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
        calendarId: "j9h0hs9rah1jb53i8hrgurumr0@group.calendar.google.com",
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
      calendarId: "j9h0hs9rah1jb53i8hrgurumr0@group.calendar.google.com",
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
    </div>
  );
};

export default Events;
