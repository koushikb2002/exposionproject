const express=require("express"); 
const db=require('./config/mongoose');
const app=express();
const mongoose=require("mongoose");
const dotenv = require('dotenv')
const multer =require("multer");
const path=require("path")

dotenv.config();
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postsRoute=require("./routes/posts");
// const eveRoute=require("./routes/events");
const studentsRoute=require("./routes/studentaff");
// mongoose.set('strictQuery', true)
const User=require('./models/User');
app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  //upload to doubt section
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  
  //upload to student affairs section
  const uploadst = multer({ storage: storage });
  app.post("/api/uploadst", uploadst.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  

//routing from link to .js file
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postsRoute);
app.use("/api/students",studentsRoute);
// app.use("/api/events",eveRoute);
app.use("/api/feeds/profile/posts", postsRoute);
app.get("/",(req,res)=>{
    res.send("welcome to homepage")
})

app.listen(8800,()=>{
    console.log("Backend server is running!")
})
