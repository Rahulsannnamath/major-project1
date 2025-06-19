const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const User = require("../models/user");
const passport = require("passport");
let { isLoggedIn,
    saveUrl} = require("../middleware");

let userRoute = require("../controllers/users.controller");

router.route("/signup")
.get(userRoute.signupForm)
.post(wrapAsync(userRoute.postsignUpForm));

router.route("/login")
.get(userRoute.loginForm)
.post(saveUrl,passport.authenticate("local",{failureRedirect:"/users/login",failureFlash:true}),
userRoute.postLoginForm);


router.post("/logout",userRoute.logout);

module.exports = router;