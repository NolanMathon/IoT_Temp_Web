Add-Type -Path "M2Mqtt.Net.dll" 

$MqttClient = [uPLibrary.Networking.M2Mqtt.MqttClient]("localhost") #adresse serveur mqtt

#$mqttclient.Connect("client mqtt"); #mqtt sans authentification
$mqttclient.Connect("client mqtt", "mqtt user", "mqtt pass")#mqtt AVEC authentification

#envoyer donn�es
$MqttClient.Publish("capteurs/1/temp�rature", 
                    [System.Text.Encoding]::UTF8.GetBytes("21 deg Celcius"), 0, 0)

					
# Disconnect
$MqttClient.Disconnect()