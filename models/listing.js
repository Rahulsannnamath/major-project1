const mongoose = require("mongoose");
const reviews = require("./review");
const user = require("./user");
const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  description:String,
  image: {
    url:String,
    filename:String
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"

    }
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

ListingSchema.post("findOneAndDelete",async (doc)=>{
  if(doc){
    await reviews.deleteMany({_id : {$in : doc.reviews}});
  }

});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
