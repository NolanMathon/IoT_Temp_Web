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

//Base de données:
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://IoT_Master:IoT_Master@cluster0.ffdcm.mongodb.net/IoT_Temp_DB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("IoT_Tempt_DB").collection("Capteurs");
  // perform actions on the collection object
  console.log(collection);
  client.close();
});
 
var capteurs = [
  {nom:"Capteur 1", temp:42, minTemp:18, maxTemp:22},
  {nom:"Capteur 2", temp:-8000, minTemp:18, maxTemp:22},
];

app.post('/setPoint', function(req, res)
{
  capteurs.forEach(capteur => {
    if(req.body.nom == capteur.nom)
    {
      capteur.minTemp = req.body.minTemp;
      capteur.maxTemp = req.body.maxTemp;
      res.send("min" + capteurs[0].minTemp + "max" + capteurs[0].maxTemp);

    }
    
  });
})