const express = require('express')
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const app = express()
const port = 80

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(req, res) {
    res.render('index', {capteurs:capteurs});
});

app.listen(port, () => {
  console.log(`Page 1 : http://localhost`)
})

const capteurs = [
  {nom:"Capteur 1", temp:25, minTemp:18, maxTemp:22},
  {nom:"Capteur 2", temp:22, minTemp:18, maxTemp:22},];