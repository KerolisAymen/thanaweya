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
    const search = req.body.seating;
    if (isNaN(search)){
      const name  = search ; 
      const re = new RegExp(name); 
      const students  = await Student.find({name : { $regex: re ,$options:'i' }}) ; 
      
      if(students != undefined){
      console.log(students); 
      res.send(JSON.stringify(students)) ; 
    }
    }
    else
    {
      const seating = search ; 
    const student  = await Student.find({seating : seating}) ; 
    if(student!=undefined) {
      console.log(student);
      console.log(JSON.stringify(student));
        res.send(JSON.stringify(student)) ; 
    }
  }
});



// const formData = new URLSearchParams();
// formData.append('seating_no', '840000');

// fetch("https://natega.youm7.com/Home/result" , {

//   method: "POST", 
//   headers : {
//     "Content-Type" : "application/x-www-form-urlencoded" , 
//     "Origin" : "https://natega.youm7.com" ,
//     "Refer" : "https://natega.youm7.com"
//   },
//   body : formData


// }).then(response => response.text()) // Parse the response as text
// .then(html => {
//   console.log('Response:', html);
  
// })
// .catch(error => {
//   console.error('Error:', error.message);
// });



const port = process.env.PORT || 3000;
app.listen(port , ()=>{
  console.log("listening to port " + port) ; 
})


