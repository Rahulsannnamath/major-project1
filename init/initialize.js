const mongoose = require("mongoose");
const  Listing = require("../models/listing");
const sampleData = require("./data");
async function main(){
try{
    await mongoose.connect("mongodb://127.0.0.1:27017/wandurlust");
    console.log("connected");

}
catch(err){
    console.log(err);
}
}

main();

async function init(){
    try{
        let reintilizedData = sampleData.data.map((listing)=>{
            return {
                  ...listing,
            owner:'68503c693e79554631ebecaf'
            }
           
        });
        await Listing.insertMany(reintilizedData);
        console.log("database intilized");
    }

    catch(err){
        console.log(err);
    }

}

init();


