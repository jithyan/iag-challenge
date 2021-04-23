import express from "express";
import helmet from "helmet";
import { passwordGameRouter } from "./routes";
import cors from "cors";

const PORT = 5000;

export const server = express();
server.use(cors({ origin: "http://localhost:3000" }));
server.use(helmet());
server.use(express.json());
server.use(passwordGameRouter);

server.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
