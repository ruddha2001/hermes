require("dotenv").config();

import { app } from "./loaders";
import { logger, port } from "./config";
import { DatabaseService } from "./api/shared/services/databaseService";

DatabaseService.getInstance()
  .connectDatabase()
  .then(() => {
    app.listen(port, () => {
      logger.info("Server running on Port " + port);
    });
  })
  .catch((error) => {
    logger.error(error.message);
  });
