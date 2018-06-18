require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

console.log(keys.twitter);
console.log(keys.spotify);

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

/*var client = new Twitter({
    consumer_key: 'Mq1YI9Uy7LV9xmnM8KaEG7LUU',
    consumer_secret: 'AjAffxkcVWnYxF1LgBFPzQuUcBghnZTtTWiUP7Ay740zCp9d4y',
    access_token_key: '1008341472008077312-8xqdDuVasWMZJYNw9TTh9ofBE3n1gS',
    access_token_secret: 'yMCBR8nbNzMUxVnvZq26ZfEtaxCRc746aQHkZx4zkIyB1'
  });*/

console.log("\nCompleted\n");

//var params = {screen_name: 'nodejs'};
var params = {screen_name: 'PaoloLaVita1', count: 1};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error && response.statusCode === 200) {
    //console.log(tweets);
    //console.log(response);
    //console.log("\nString= " + JSON.stringify(tweets, null, 4));
    //console.log("\nThe Tweets are: " + JSON.parse(tweets).tweettext);
    //console.log(tweets);
    var output = JSON.stringify(tweets, null, 4);
    console.log(output);
  }
});

console.log("\nCompleted 2\n");