import { app } from "./app";
import config from "./config";

//Start mongoose & event bus
const start = async () => {
  const server = app.listen(config.PORT, () => {
    console.warn(`Listening on port ${config.PORT}!...`);
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: any) => {
    console.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
};

start();
