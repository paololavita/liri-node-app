require("dotenv").config();
var keys = require("./keys.js");

var fs = require("fs");
var inquirer = require('inquirer');
var request = require("request");


var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


// Make it so liri.js can take in one of the following commands:
// * `my-tweets`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
// Using a switch case below for program flow and control

switch(process.argv[2]) {

    case "my-tweets":
        twitterThis();
        logFile("Tweets");
    break;

    case "spotify-this-song":
        if (process.argv[3] == null) {
            spotifyThis("The sign");
            logFile("The Sign");
            break;
        } else {
            spotifyThis(process.argv[3]);
            logFile(process.argv[3]);
            break;
          } 

    case "movie-this": 
        if (process.argv[3] == null) {
            movieThis("Mr. Nobody");
            logFile("Mr. Nobody");
            break;
        } else {
            movieThis(process.argv[3]);
            logFile(process.argv[3]);
            break;
          } 

    case "do-what-it-says":
        doWhat();
        logFile("Did what it said to do!");
        break;    
    }    

function movieThis(movie) {

// Run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=Full&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover the imdbRating Responses
    
    console.log("\nTitle of the movie: " + JSON.parse(body).Title);
    console.log("\nYear the movie came out: " + JSON.parse(body).Year);
    console.log("\nIMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value);
    console.log("\nRotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
    console.log("\nCountry where the movie was produced: " + JSON.parse(body).Country);
    console.log("\nLanguage of the movie: " + JSON.parse(body).Language);
    console.log("\nPlot of the movie: " + JSON.parse(body).Plot);
    console.log("\nActors in the movie: " + JSON.parse(body).Actors + "\n");

  }
});

}

function twitterThis() {

var client = new Twitter(keys.twitter);

//For testing Twitter Key seperate from file

/*var client = new Twitter({
    consumer_key: 'q3hS07D6pd69euRnx8bVKr4A2',
    consumer_secret: 'X2SkVX95RpzOoXUZUnHv9COi0tqK2fykIHSsYMYU3iJTM6yRxi',
    access_token_key: '1008341472008077312-Z7Qz9ADUDcsDeG3iHt7IQ0qi5NWcuY',
    access_token_secret: 'P6QkD4IfdOhdt2X2dP0OkCLDLRIUhAuvk2fqBHsDL3kjy'
  });*/

//console.log(client);


var params = {screen_name: 'PaoloLaVita', count: 20};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error && response.statusCode === 200) {
    console.log(tweets);

    //Testing
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
});
}

function spotifyThis(song) {

  var spotify = new Spotify(keys.spotify);

    spotify
      .search({ type: 'track', query: song, limit: 20 })
      .then(function(response) {
        console.log("\nThe Artist is: " + response.tracks.items[0].album.artists[0].name);
        console.log("\nThe Name of the Song is: " + response.tracks.items[0].name);
        console.log("\nPreview link on Spotify: " + response.tracks.items[0].external_urls.spotify);
        console.log("\nThe Album is called: " + response.tracks.items[0].album.name + "\n");
      })
      .catch(function(err) {
        console.log(err);
      });

}

function doWhat() {

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    spotifyThis(data);
  
  });
  
}

function logFile(log) {

  // This block of code will append to the records in a file called "log.txt".
  
  fs.appendFile("log.txt", log + "\n", function(err) {
  
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    // Otherwise, it will print: "log.txt was updated!"
    //console.log("log.txt was updated with " + log);
  
  });
  
  }