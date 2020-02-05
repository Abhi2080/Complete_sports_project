const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect("mongodb://localhost:27017/sportsDB",  {useNewUrlParser: true});

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    type: String,
    branch: String,
    semester: Number,
    password: String
});

const Student = mongoose.model("student", studentSchema);

const student = new Student({
    name : "Abhinav Singh",
    rollNo: 181210001,
    type: "Student",
    branch: "Computer Science and Engineering",
    semester: 4,
    password: "test1234"
})


// student.save();





app.get("/",function(req,res){
    res.render("home");
})


app.get("/login",function(req,res){
    res.render("login",{arrayOfInformation : optionForLogin });
})

var optionForLogin = [];
app.post("/",function(req,res){
    var namE = req.body.Name;
    var passworD = req.body.Password;
    var rollNO = req.body.RollNo;
    console.log(namE,passworD,rollNO);
    Student.find({name:namE},function(error,st){
        if(error){
            console.log(error);
        }else{
            optionForLogin.push(st[0]);
            console.log(optionForLogin);
            if(st[0].password===passworD){
                res.redirect("/login");
            }else{
                res.send("oops! wrong password");
            }
        }
    });
})





app.listen(3000,function(){
    console.log("Server successfully running at port 3000");
});