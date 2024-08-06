const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs") ; 
const app = express();
app.use(express.json()) ;

const mongooseUrl = "mongodb+srv://kerolisaymen456:kerokero@cluster0.esr6ijd.mongodb.net/thanaweya?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongooseUrl)
  .then(() => {
    console.log("connected succesfully");
  })
  .catch((err) => {
    console.log("error connecting to mongodb ", err);
  });
const studentchema = new mongoose.Schema({
  seating: Number,
  name: String,
  degree: Number,
});

const Student = mongoose.model("Student", studentchema);


app.get("/" , (req,res)=>{
  res.sendFile(path.join(__dirname,"home.html")); 
})
app.post("/getdata", async(req, res) => {
  console.log(req.body.seating) ; 
    const seating = req.body.seating;
    const student  = await Student.findOne({seating : seating}) ; 
    if(student!=undefined) {
      console.log(student);
      console.log(JSON.stringify(student));
        res.send(JSON.stringify(student)) ; 
    }
});


const port = process.env.PORT || 3000;
app.listen(port , ()=>{
  console.log("listening to port " + port) ; 
})