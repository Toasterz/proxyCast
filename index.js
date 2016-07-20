var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var port = process.env.PORT || 8080;
var apiKey = require('./config').apiKey;
var $http = require('axios');
var logger = require('./logger');
var baseUrl = 'https://api.forecast.io/forecast/';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());
server.use(logger);

server.get('/forecast/hourly/:lat,:lon', function(req,res)
{
  $http.get(baseUrl + apiKey + '/' + req.params.lat + ',' + req.params.lon)
        .then(function(response)
        {
          var overSummary = response.data.daily.summary;
          var overIcon = response.data.daily.icon;
          var dailyData = response.data.daily.data;
          var dailyArr = [];
          for(var x = 0; x < dailyData.length; x+=1)
          {
            var o =
            {
              icon: dailyData[x].icon,
              tempMax: dailyData[x].temperatureMax,
              tempMin: dailyData[x].temperatureMin,
              humidity: dailyData[x].humidity,
              precipProb: dailyData[x].precipProbability
            };
            dailyArr.push(o);
          }
         var resObj =
          {
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            summary: overSummary,
            icon: overIcon,
            daily: dailyArr
          };
          res.status(200).json(resObj);
        })
        .catch(function(error)
        {
          res.status(500).json({msg:err});
        });
});

server.listen(port, function()
{
  console.log("Now listening on port " + port);
})
