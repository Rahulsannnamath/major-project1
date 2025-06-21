const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/expressError");
const List = require("./routes/listings");
const reviewRoute = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoute = require("./routes/user");
require('dotenv').config();


const sessionOptions = {
    secret:"mysecretkey",
    resave : false,
    saveUninitialized: true,
    cookie :{
        // expires:Date.now() * 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


async function main() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_ATLAS);
        console.log("database is connected");
    } catch (err) {
        console.log(err);
    }
}
main();

app.use((req,res,next)=>{
res.locals.success = req.flash("success");
res.locals.registration = req.flash("signup");
res.locals.error = req.flash("error");
res.locals.currentUser = req.user;
next();
});

app.listen(8080, () => {
    console.log("server is at 8080");
});



app.use("/listings",List);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/users",userRoute);

app.get("/", (req, res) => {
    res.redirect("/listings");
});



app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
   res.render("error.ejs",{err});
});

