const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const app = express();
const port = 8010;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose.connect(
    "mongodb+srv://aluthwalahewapasindu:Xeerc9BZyZr4BmQQ@cluster0.ysfi3.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }
).then(() => {
    console.log("Connected to Mongo DB");
}).catch((err) => {
    console.log("Error connected to Mongo DB", err);
});

app.listen(port, () => {
    console.log("Server running on port 8000");
})