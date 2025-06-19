const { findById } = require("./models/review");
const Listing = require("./models/listing");

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirect = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/users/login");
    }
    next();
}

const saveUrl = (req, res, next) => {
    if (req.session.redirect) {
        res.locals.redirect = req.session.redirect;
    }
    next();
};

async function isowner(req,res,next){
let {id} = req.params;
let listing = await Listing.findById(id);
if(!listing.owner._id.equals(res.locals.currentUser._id )){
    req.flash("error","you are not the owner of this listing");
    return res.redirect("/listings/"+id);
}
next();

}


module.exports = {
    isLoggedIn,
    saveUrl,
    isowner
};
