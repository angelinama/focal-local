import React from "react";
import Button from "react-bootstrap/Button";
require("dotenv").config();

const Events = () => {
  const gapi = window.gapi;
  //TODO move client_id api_key to to Heroku?
  //consts need to user google calendar API
  const APIKey = process.env.REACT_APP_APIKey;
  const ClientId = process.env.REACT_APP_CLIENT_ID;
  const DISCOVERY = [process.env.REACT_APP_DISCOVERY_DOCS];
  const SCOPES = process.env.REACT_APP_SCOPES;

  return (
    <>
      <h1>
        API key: {APIKey} Client_id is: {ClientId}
        discover docs: {DISCOVERY}
        scopes: {SCOPES}
      </h1>
      <h1>***** Where the event lists goes later</h1>
      <Button variant="success">Show Calendar</Button>{" "}
    </>
  );
};

export default Events;
