const express = require('express')
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const mongoose = require('mongoose');
const { Decimal128, Int32 } = require('mongodb');

const app = express()
const port = 80

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

mongoose.connect('mongodb+srv://IoT_Master:IoT_Master@cluster0.ffdcm.mongodb.net/IoT_Temp_DB?retryWrites=true&w=majority');

const datasSchema = {
  temp: Decimal128
}

const capteursSchema = {
  name: String,
  min: Decimal128,
  max: Decimal128,
  temp: Decimal128
}

const Datas = mongoose.model('Datas', datasSchema);
const Capteurs = mongoose.model('Capteurs', capteursSchema);

// var capteurs = [
//   {nom:"Capteur 1", temp:42, minTemp:18, maxTemp:22},
//   {nom:"Capteur 2", temp:-8000, minTemp:18, maxTemp:22},
// ];



app.get('/', (req, res) => {
  Datas.find({}, function(err, datas)  
  {
    Capteurs.find({}, function(err, capteurs)
    {
      console.log("capteurs : " + capteurs);
      res.render('index',  {datasList: datas, capteursList: capteurs});
    })
  }
)})

app.listen(port, () => {
  console.log(`Page 1 : http://localhost`)
})

/* //Base de données:
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://IoT_Master:IoT_Master@cluster0.ffdcm.mongodb.net/IoT_Temp_DB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collectionCapteurs = client.db("IoT_Tempt_DB").collection("Capteurs");
  const collectionDatas = client.db("IoT_Tempt_DB").collection("Datas");
  // perform actions on the collection object
  client.close();
}); */


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