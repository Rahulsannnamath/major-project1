const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(3000,()=>{
  console.log("server is at 3000");
});

app.use(session({secret : "myfirstlogin",
  resave:false,
  saveUninitialized:true
}));

app.use(flash());


app.get("/register",(req,res)=>{
  let {name = "default"} = req.query;
  req.session.name = name;
  req.flash("success" , "registerd user");
  res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
res.render("page.ejs",{name:req.session.name , msg:req.flash("success")});

});