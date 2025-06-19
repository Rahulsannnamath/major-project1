const express = require("express");
const router = express.Router();
let { isLoggedIn , isowner} = require("../middleware");

const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapasync");
let listingControllers = require("../controllers/listings.controller");
const multer  = require('multer');
const {storage} = require("../cloudconfig");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingControllers.index))
.post(upload.single("image"), wrapAsync(listingControllers.postListing));

router.get("/new", isLoggedIn , listingControllers.new);

router.get("/:id", wrapAsync(listingControllers.show));


router.get("/:id/edit", isLoggedIn ,isowner , wrapAsync(listingControllers.editForm));

router.route("/:id")
.put(wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn ,isowner,wrapAsync(listingControllers.deleteListings));


module.exports = router;