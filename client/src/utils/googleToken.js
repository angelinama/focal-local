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
    // process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDM+uYwxNsjqi29\nwWlvXKAAgwaOU7wYupDOfd3qRXytAi8Z1lTSelwlO3AQwVIHS4zpw3ZRF3u4IcXj\nefMHGNcVDbxFv4xkeO3FTk34k8SDcoQWvVlCPA2yX2ZN5Dy97zd3QesnYvugGLHv\nXFnD0jlcp+ajNigNO3/jb9ENJbJ56EA6HJvrD3VxaOZFbl1CAnespnyxHqR6q7IG\nGDDBoI3w19oeDyY2h1XZH5NmW7LcSS3KBzI9Bu/lhFALO0Hv3FeK85dCHxAir9VZ\nlutIttaQtlKmyg+uxXHnPySIjv7Ko0JPloiGR6XZCygwi1Ahz7EhpBb6Njso+lAw\n5X7OL/4bAgMBAAECggEAK7wQpzEpTHe/4K/GrjMGFHXgTTfCd0g/Iz+pvJVs34EK\nyal4WZwv0uXWqEyHEvVksG+669xl0kiqbzmSx93d7ikLFZqj+r/ug12Mt0/X6u/h\nDPUDeWVUys0eB9p9t0y1+eT/plyxMVxzgo2ivWw6PvG3/PTOINykEcPGx9ZWOToZ\nmPTDNOdd+N7oB5imEoijEXMstYw0nue0Jrf30jI1eQNmZRNPZ7tO3e+OYesa2SDB\nBmG2vQs2Bclz6uqL+hkL9W2zMJXmzELM1XrZ0HQQ2ui0/hHVkI7LXi63ZLGgY+SF\nyYmPu7T5W6hPwl++iOlPY+4z/xSWnBOqKENGIAaX+QKBgQD1AAgHhyMxFZciBpWM\n+gAaTK7mIdfEJeRi7gNegmd9ovJ7fgGalhbAI81yLtRFt2KZ8DZ0svt1KPwk2K4G\nReEmyv0uY1q+YozUyAendIKsm75a1gx0arvSYlw1EK4DXaFJZDC3hoLYBqU4Ovh8\nmvfaOVs6mCsvnTOce7DblEGPJwKBgQDWLuM8nB4okBc/P1QtuMFALA9Gk8zsimDW\nnrvtI2mfVxbBymeTOUeedHwRQxKIzZ2eGc5zHzNaWYg6pIKZHT9i8Qi5fj7m/nIu\nrmHRum2p208UO8D2q4/8isxjRt48AbmInhOul/Mj5O6P2SsvyWnlDhRkQmV0lbZd\n9GpBJSgx7QKBgFohrtKGJq4yES2VWoNIna0PNPC41pX0krbKdTbZppUT0z0XOCPU\nv33kLfqpu7ICKyYStxXrmpKZh1lO1Ya9Qn1xA/+C0alkvAazqA000bYKfdcRE/fo\nJDzbrqxe/IWEdod3cmyx8YTjvPiYyT2eDTydCTDfNlQH8yrIXmIJgqzVAoGAelDu\nnud9ZabcT9dnyHCxlGdVFfZEWnWwVgDyy7ukj0XaDjP8MJzOpNRbIjSOuifKssaE\nG0SfPCLTZMIcfzqvv15toBlT7PE03iniXTa9d/pxz9lMGtLheNT/YlbPha9qeHXm\nQZgvV7le8DGSs0iwPAptZNByRkFVk5SItcl1igUCgYAhogEbxCIjydk4qXXTXgxW\nDJMaSr/VR7/ZtG2SESEFow/BYpz9wiEhltpdsqlcBN7iNbH2uqk62QwCFnjpJwWV\n6RUQveDyLEK7C4+ltzLhl9qiTNQpDWXT6e3aUw+27vJsOMP0bZPZ/qT0IJD5EnW7\njAAJ4f2Tnx+b1fHXBJFTIA==\n-----END PRIVATE KEY-----\n",
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
