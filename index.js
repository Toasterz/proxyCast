var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var port = process.env.PORT || 8080;
var apiKey = require('./config').apiKey;
var $http = require('axios');
var baseUrl = 'https://api.forecast.io/forecast/';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

server.get('/forecast/hourly/:lat,:lon', function(req,res)
{
  $http.get(baseUrl + apiKey + '/' + req.params.lat + ',' + req.params.lon)
        .then(function(response)
        {
          var resObj =
          {
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            hourly: response.data.hourly,
          };
          res.json(resObj);
        })
        .catch(function(error)
        {
          console.log(error);
          console.log('catch error');
        });
});

server.listen(port, function()
{
  console.log("Now listening on port " + port);
})
