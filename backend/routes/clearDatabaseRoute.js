'use strict';
const express = require("express");
const Router = express.Router();
let ClearDatabaseController = require('../controllers/clearDatabaseController');

// app.use("/clearDatabase", ClearDatabase);
Router.delete("/", ClearDatabaseController.clearDatabase);

module.exports = Router;