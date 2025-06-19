const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.postReview = async (req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let {comment , rating} = req.body;
    let newReview = new Review({
        comment:comment,
        rating:rating
    });
    newReview.author = req.user._id;
    await newReview.save();
    listing.reviews.push(newReview._id);
    await listing.save();
    res.redirect("/listings/"+req.params.id);
    }

module.exports.deleteReview = async (req,res,next)=>{
    let {id , reviewid} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    res.redirect("/listings/"+id);
}
