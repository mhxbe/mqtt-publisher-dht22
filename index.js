const mqtt = require('mqtt');
const sensor = require('node-dht-sensor');

const DHT_TYPE = 22;
const GPIO_PIN = 4;
const MESSAGES = {
  TEMPERATURE: 'office/temperature',
  HUMIDITY: 'office/humidity',
  ALL: 'office/all',
};
const client = mqtt.connect('mqtt://192.168.0.135', {
  port: 1883,
  clientId: 'office-dht22',
});

client.on('connect', () => {
  client.subscribe(`{MESSAGES.TEMPERATURE}/get`);
  client.subscribe(`{MESSAGES.HUMIDITY}/get`);
  client.subscribe(`{MESSAGES.ALL}/get`);
});

client.on('message', (topic, message) => {
  sensor.read(DHT_TYPE, GPIO_PIN, (err, temperature, humidity) => {
    if (!err) {
      switch() {
        case `${MESSAGES.TEMPERATURE}/get`:
          client.publish(MESSAGES.TEMPERATURE, temperature);
          break;

        case `${MESSAGES.TEMPERATURE}/get`:
          client.publish(MESSAGES.HUMIDITY, humidity);
          break;

        case `${MESSAGES.ALL}/get`:
          client.publish(MESSAGES.all, { temperature, humidity });
          break;
      }
    }
  });
});

