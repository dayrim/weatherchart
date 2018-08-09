const express = require("express");
const path = require("path");
var YQL = require("yql");
const app = express();
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.route("/api/forecast/*").get((req, res) => {
  var query = new YQL(
    'select title, item.forecast, wind  from weather.forecast where woeid in (select woeid from geo.places where text="' +
      String(req.params[0]) +
      '") and u = "C" limit 3 | sort(field="item.forecast.date", descending="false")'
  );

  query.exec(function(err, data) {
    res.send(data);
  });
});

app.route("/api/locations/*").get((req, res) => {
  var query = new YQL(
    'select * from geo.places where text = "' + String(req.params[0]) + '*"'
  );

  query.exec(function(err, data) {
    res.send(data);
  });
});

app.use(express.static(__dirname + "/dist/weather-chart"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/weather-chart/index.html"));
});
app.listen(process.env.PORT || 8080);
