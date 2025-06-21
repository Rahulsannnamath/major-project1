const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampleData = require("./data");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1Ijoic2FubmFtYXRoIiwiYSI6ImNtYzRleXI1dzAwanAyanF5ZDNzYTd2MXEifQ.c3vCrWWeMNlW93TIL9tQog"; // replace this with your actual token
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wandurlust");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
}

main();

async function init() {
  try {
    const categories = ["Rooms", "Apartments", "Villas", "Farm stays", "Beach"];

    const reintializedData = await Promise.all(sampleData.data.map(async (listing) => {
      // Get coordinates from Mapbox
      const geoData = await geocodingClient
        .forwardGeocode({
          query: listing.location,
          limit: 1
        })
        .send();

      const coordinates = geoData.body.features[0]?.geometry?.coordinates || [0, 0];

      // Pick a random category
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      return {
        ...listing,
        owner: '6853e302709ee7fd6f29ba92',
        geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        category: randomCategory
      };
    }));

    await Listing.deleteMany({}); 
    await Listing.insertMany(reintializedData);
    console.log("Database Initialized with Random Categories & Coordinates");
  } catch (err) {
    console.error("Initialization Error:", err);
  }
}

init();