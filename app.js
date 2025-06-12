const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const Listing = require("./models/listing");
const path = require("path");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapasync");
const ExpressError =require("./utils/expressError");

app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

async function main() {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/wandurlust');
        console.log("database is connected");
    } catch (err) {
        console.log(err);
    }
}
main();

app.listen(8080, () => {
    console.log("server is at 8080");
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.get("/listings", wrapAsync(async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index", { allListing });
}));

app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("listings/show", { list });
}));

app.post("/listings", wrapAsync(async (req, res) => {
    let { title, description, price, location, country, image } = req.body;
    await Listing.create({
        title,
        description,
        price,
        location,
        country,
        image
    });
    res.redirect("/listings");
}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/editListing", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, price, location, country, image } = req.body;
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        location,
        country,
        image
    });
    res.redirect("/listings/" + id);
}));

app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});



app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
   res.render("error.ejs",{err});
});

