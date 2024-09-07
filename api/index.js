const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const app = express();
const port = 8000;
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
});


const User = require("./models/user");
const Massage = require("./models/massage");


// endpoint for registration of the user
app.post("/register", (req, res) => {
    const { name, email, tele, password, image } = req.body;

    //create a new User object
    const newUser = new User({ name, email, tele, password, image });

    //save the user to the database
    newUser.save().then(() => {
        res.status(200).json({ massege: "User registered successfully" })
    }).catch((err) => {
        console.log("Error registering user", err);
        res.status(500).json({ massege: "Error registering user!" })
    });
});


//function to create a token for the user
const createToken = (userId) => {
    // Set the token payload
    const payload = {
      userId: userId,
    };
  
    // Generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  
    return token;
  };


//endpoint for loging in of user
app.post("/login",(req,res) => {
    const {email,password} = req.body;

    //check email and password are provided
    if(!email || !password){
        return res.status(404).json({massege:"Email and Password are required"})
    }

    //check for user in the database
    User.findOne({email}).then((user) => {
        if(!user){
            //user not found
            return res.status(404).json({massege:"USer not Found"})
        }

        //Compare password into database  password
        if(user.password != password){
            return res.status(404).json({message: "Invalid Password!"})
        }

        const token = createToken(user._id);
        res.status(200).json({token})
    }).catch((error) => {
        console.log("error in finding the user", error);
        res.status(500).json({massege: "Internal server Error!"});
    })
}) 