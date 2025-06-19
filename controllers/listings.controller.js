const Listing = require("../models/listing");


module.exports.index = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index", { allListing });
}

module.exports.new = (req, res) => {
    res.render("listings/new");

}

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate({path : "reviews" , populate:{
        path:"author"
    }}).populate("owner");
    res.render("listings/show", { list });
}

module.exports.postListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let { title, description, price, location, country } = req.body;
    await Listing.create({
        title,
        description,
        price,
        location,
        country,
        image:{
            url:url,
            filename:filename
        },
       owner:req.user._id
    });

    req.flash("success" , "new Listing created!");
    res.redirect("/listings");
}

module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/editListing", { listing });
}


module.exports.updateListing =async (req, res) => {
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
}

module.exports.deleteListings = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "listing deleted!");
    res.redirect("/listings");
}



