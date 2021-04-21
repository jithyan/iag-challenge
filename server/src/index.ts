import express from "express";
import helmet from "helmet";

const PORT = 5000;

const server = express();
server.use(helmet());
server.use(express.json());

server.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
