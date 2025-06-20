const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1Ijoic2FubmFtYXRoIiwiYSI6ImNtYzRleXI1dzAwanAyanF5ZDNzYTd2MXEifQ.c3vCrWWeMNlW93TIL9tQog";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


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
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
      }).send()

console.log(response.body.features[0].geometry.coordinates);

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
    let { title, description, price, location, country} = req.body;
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
    let filename = req.file.filename;
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        location,
        country,
        image :{
            url:url,
            filename:filename
        }
    });
}

else{
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        location,
        country, });
}
    
    res.redirect("/listings/" + id);
}

module.exports.deleteListings = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "listing deleted!");
    res.redirect("/listings");
}



