import axios from "axios";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateGoogleToken = (cb) => {
  const token = jwt.sign(
    {
      iss: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: process.env.REACT_APP_SCOPES,
      aud: "https://oauth2.googleapis.com/token",
      exp: new Date().getTime() / 1000 + 60 * 60, //maximum an hour after iat
      iat: new Date().getTime() / 1000,
    },
    process.env.REACT_APP_PRIVATE_KEY,
    { algorithm: "RS256" }
  );
  //   console.log("jwtToken: " + token);

  // google auth has to have a request as a encoded string
  const request = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${token}
  `;

  axios
    .post("https://oauth2.googleapis.com/token", request, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(({ data }) => {
      console.log(data);
      cb(data);
    })
    .catch((err) => console.log(err));
};

export default generateGoogleToken;
