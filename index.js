var express = require('express');
var app = express();

// '/' est la route racine
app.get('/', function (req, res) {
  res.send('Bonjour !');
});

app.listen(80, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});