const express = require('express')
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const mqtt = require('mqtt')

const mongoose = require('mongoose');
const { Decimal128, Int32 } = require('mongodb');

const app = express()
const port = 80

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

/* Database */
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://IoT_Master:IoT_Master@cluster0.ffdcm.mongodb.net/IoT_Temp_DB?retryWrites=true&w=majority');
}

const datasSchema = new mongoose.Schema({
  temp: Decimal128
});

const capteursSchema =  new mongoose.Schema({
  name: String,
  min: Decimal128,
  max: Decimal128,
  temp: Decimal128
});

const Datas = mongoose.model('Datas', datasSchema);
const Capteurs = mongoose.model('Capteurs', capteursSchema);

/* MQTT */
const host = 'broker.emqx.io'
const portMQTT = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${portMQTT}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

const capteur1 = '/capteurs/1/temperature'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([capteur1], () => {
    console.log(`Subscribe to topic '${capteur1}'`)
  })
})


client.on('message', (capteur1, payload) => {
  // Changer la donnée dans la base de donnée
  console.log('Received Message:', capteur1, payload.toString())
})

/* Vues */

app.get('/', (req, res) => {
  Datas.find({}, function(err, datas)  
  {
    Capteurs.find({}, function(err, capteurs)
    {
      console.log("capteurs : " + capteurs);
      console.log("datas : " + datas);
      res.render('index',  {datasList: datas, capteursList: capteurs});
    })
  }
)})

app.listen(port, () => {
  console.log(`Page 1 : http://localhost`)
})

app.get('/api/capteurs', (req, res) => {
  Capteurs.find({}, function(err, capteurs)
  {
    res.json(capteurs);
  })
})

app.get('/api/datas', (req, res) => {
  Datas.find({}, function(err, datas)  
  {
    res.json(datas);
  })
})

app.post('/setPoint', function(req, res)
{
  capteurs.forEach(capteur => {
    if(req.body.name == capteur.name)
    {
      capteur.min = req.body.min;
      capteur.max = req.body.max;
      res.send("min" + capteurs[0].min + "max" + capteurs[0].max);
    }    
  });
})