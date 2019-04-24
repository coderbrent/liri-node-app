require("dotenv").config();
const axios = require("axios");
const moment = require("moment");

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

let searchType = process.argv[2];
let artist = process.argv[3];
let queryURL = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

if(searchType === 'concert-this') {
  axios.get(queryURL).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  })
}