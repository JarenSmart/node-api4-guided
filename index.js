// A few different ways to stand up a web server with an IP address

// - We could self-host from our own house
// - We could rent a server from a hosting company
// - We could use a web hosting service (ex. Netlify, Zeit, Heroku)

// Website that outlines best methodology for deploying web apps. https://12factor.net/

// install cross-env --> npm i --save-dev cross-env

// install dotenv --> npm i dotenv (this will help us hide sensitive info we don't want seen within our code)

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const welcomeRouter = require("./welcome/welcome-router");
const shoutsRouter = require("./shouts/shouts-router");

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/", welcomeRouter);
server.use("/shouts", shoutsRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
