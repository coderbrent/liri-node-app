require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const inquirer = require("inquirer");
var Spotify = require("node-spotify-api");

let keys = require("./keys.js");
let spotify = new Spotify({
  id: "2dcaa83095764a059c360b99f52a2541",
  secret: "7e6a962907ec4bd0ac1409969ebf055e"
});

inquirer
.prompt([
  {
    name: 'searchType',
    type: 'rawlist',
    message: 'what type of search would you like to perform?',
    choices: ['concert', 'song', 'movie', 'do-what-it-says']
  },
  {
    name: 'artist',
    type: 'input',
    message: 'what artist/song/movie would you like to search for?'
  }
]).then(function(search) {
  if(search.searchType === 'concert') {
    let queryURL = ("https://rest.bandsintown.com/artists/" + search.artist + "/events?app_id=codingbootcamp")
    axios.get(queryURL).then(function(response) {
      let eventCount = response.data.length;
      console.log('Your search returned ' + eventCount + ' results!');
      for(i=0; i < response.data.length; i++) {
        console.log('venue: ' + response.data[i].venue.name);
        console.log('location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region);
        console.log('date: ' + moment(response.data[i].venue.datetime).format("MM-DD-YYYY"));
        console.log('------------------');
      }
    }).catch(function(error) {
      console.log(error);
    })
  } else if(search.searchType === 'song') {
    spotify.search({
      type: 'track',
      query: search.artist
    }, function(err, data) {
      if(err) {
        return console.log('Error occurred: ' + err);
      }
      for(i=0; i < data.tracks.items.length; i++) {
        console.log('------results-------')
        console.log(data.tracks.items[i].name);
        console.log(data.tracks.items[i].album.name);
        console.log(data.tracks.items[i].preview_url)
        
        if(!data.tracks.items[i].artists[i]) {
          return console.log('...no additional artists were found for this song')
        } else if (!data.tracks.items[i].preview_url) {
          return console.log('no previews are available for this track')
        }
      
      }
      
    })
  }
})


