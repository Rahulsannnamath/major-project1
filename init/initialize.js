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
        await Listing.insertMany(sampleData.data);
        console.log("database intilized");
    }

    catch(err){
        console.log(err);
    }

}

init();


