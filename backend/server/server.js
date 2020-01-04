const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const databaseConnection = require("../database/mysqlconnection");
const ProductRoutes = require("../routes/productRoute");
const ReviewRoutes = require("../routes/reviewRoute");
const QuestionsRoute = require("../routes/questionRoute");
const ETLRoutes = require("../routes/etlRoute");
const SearchRoute = require("../routes/searchRoute");
const ClearDatabase = require("../routes/clearDatabaseRoute");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/products", ProductRoutes);
app.use("/reviews", ReviewRoutes);
app.use("/questions", QuestionsRoute);
app.use("/etl", ETLRoutes);
app.use("/search", SearchRoute);
app.use("/clearDatabase", ClearDatabase);

app.listen(3000);
