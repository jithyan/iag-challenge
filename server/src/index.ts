import express from "express";
import helmet from "helmet";
import { passwordGame } from "./routes/password";
import { shuffle } from "./util";
import cors from "cors";

const PORT = 5000;

const server = express();
server.use(cors({ origin: "http://localhost:3000" }));
server.use(helmet());
server.use(express.json());
server.use(passwordGame);

server.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

// // ensures we close the server in the event of an error.
// function setupCloseOnExit(server: any) {
//   // thank you stack overflow
//   // https://stackoverflow.com/a/14032965/971592
//   async function exitHandler(options: any = {}) {
//     await server
//       .close()
//       .then(() => {
//         //logger.info("Server successfully closed");
//         console.log("Serrver closed successfully");
//       })
//       .catch((e: any) => {
//         //logger.warn("Something went wrong closing the server", e.stack);
//         console.warn("Something went wrong closing server");
//       });
//     if (options.exit) process.exit();
//   }
//   // do something when app is closing
//   process.on("exit", exitHandler);
//   // catches ctrl+c event
//   process.on("SIGINT", exitHandler.bind(null, { exit: true }));
//   // catches "kill pid" (for example: nodemon restart)
//   process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
//   process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
//   // catches uncaught exceptions
//   process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
// }

// setupCloseOnExit(server);
