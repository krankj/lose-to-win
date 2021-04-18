const express = require("express");
const port = process.env.PORT || 9000;
require("dotenv").config();
const cors = require("cors");
const app = express();
const log4j = require("log4js");
const logger = log4j.getLogger();
logger.level = "debug";
const { UserRoutes } = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", UserRoutes);

app.listen(port, () => logger.info(`Listening on port ${port}`));
