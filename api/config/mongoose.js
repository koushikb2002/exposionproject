const mongoose =require("mongoose");
const { db } = require("../models/User");
mongoose.connect("mongodb://localhost/social_db");
const dp=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log("successfully Connected to Mongodb");
});
