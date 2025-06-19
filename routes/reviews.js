const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing");
const Review = require("../models/review");
const path = require("path");
const wrapAsync = require("../utils/wrapasync");
const {isLoggedIn} = require("../middleware");
const reviewController = require("../controllers/reviews.controller");


router.post("/",isLoggedIn,wrapAsync(reviewController.postReview));


router.delete("/:reviewid",isLoggedIn,wrapAsync(reviewController.deleteReview));
    

module.exports = router;