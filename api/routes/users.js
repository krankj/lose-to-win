const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users");

usersRouter.get("/health", [usersController.health]);
usersRouter.post("/add", [usersController.insert]);

module.exports = usersRouter;
