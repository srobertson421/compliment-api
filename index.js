var express = require('express');
var request = require('request');

var app = express();
var PORT = process.env.PORT || 3000;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/', function(req, res) {
  request('https://spreadsheets.google.com/feeds/list/1eEa2ra2yHBXVZ_ctH4J15tFSGEu-VTSunsrvaCAV598/od6/public/values?alt=json', function(err, response, body) {
    var data = JSON.parse(body);
    var rndInt = getRandomInt(0, data.feed.entry.length - 1);
    var compliment = data.feed.entry[rndInt]['gsx$compliments']['$t'];
    if(compliment) {
      res.status(200).send(compliment);
    } else {
      res.status(404).send("Couldn't retrieve compliment, try again");
    }
  });
});

app.listen(PORT);
