require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

//console.log(keys.twitter);
//console.log(keys.spotify);

//var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//var spotify = new Spotify(keys.spotify);

/*var client = new Twitter({
    consumer_key: 'q3hS07D6pd69euRnx8bVKr4A2',
    consumer_secret: 'X2SkVX95RpzOoXUZUnHv9COi0tqK2fykIHSsYMYU3iJTM6yRxi',
    access_token_key: '1008341472008077312-Z7Qz9ADUDcsDeG3iHt7IQ0qi5NWcuY',
    access_token_secret: 'P6QkD4IfdOhdt2X2dP0OkCLDLRIUhAuvk2fqBHsDL3kjy'
  });*/

//console.log(client);

//console.log("\nCompleted\n");

//var params = {screen_name: 'nodejs'};
/*var params = {screen_name: 'PaoloLaVita', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error && response.statusCode === 200) {
    //console.log(tweets);
    //console.log(response);
    //console.log("\nString= " + JSON.stringify(tweets, null, 4));
    //console.log("\nThe Tweets are: " + JSON.parse(tweets).tweettext);
    //console.log(tweets);
    //var output = JSON.stringify(tweets, null, 4);
    var itemsToIterate = tweets.slice(0).reverse();
    for (var i = 0; i < itemsToIterate.length; i++){
    console.log("\nMy Tweets are as follows: " + itemsToIterate[i].text + "\n");
  }
}
});*/

//console.log("\nCompleted 2\n");

/*spotify.search({ type: 'track', query: 'All the Small Things', limit: 5 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(items); 
});*/

var song1 = "hobo humpin slobo babe";
var song2 = "rockafeller skank";
var song3 = "wynona's big brown beaver";
var song4 = "who was in my room last night";
var song5 = "Praise You";
var song6 = "wynona's big brown beaver";
var song7 = "hobo humpin slobo babe";
var song8 = "rockafeller skank";
var song9 = "wynona's big brown beaver";

var query = song5;

spotify
  .search({ type: 'track', query: query, limit: 1 })
  .then(function(response) {
    console.log("\nThe Artist is: " + response.tracks.items[0].album.artists[0].name);
    console.log("\nThe Name of the Song is: " + response.tracks.items[0].name);
    console.log("\nPreview link on Spotify: " + response.tracks.items[0].external_urls.spotify);
    console.log("\nThe Album is called: " + response.tracks.items[0].album.name + "\n");
  })
  .catch(function(err) {
    console.log(err);
  });