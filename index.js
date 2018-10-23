const mqtt = require('mqtt');
const sensor = require('node-dht-sensor');

const DHT_TYPE = 22;
const GPIO_PIN = 4;
const MESSAGES = {
  TEMPERATURE: 'jidoka/office/temperature',
  HUMIDITY: 'jidoka/office/humidity',
  ALL: 'jidoka/office/all',
};
const client = mqtt.connect('mqtt://192.168.0.135', {
  port: 1883,
  clientId: 'office-dht22',
});

client.on('connect', () => {
  client.subscribe(`${MESSAGES.TEMPERATURE}/get`);
  client.subscribe(`${MESSAGES.HUMIDITY}/get`);
  client.subscribe(`${MESSAGES.ALL}/get`);
});

client.on('message', (topic, message) => {
  sensor.read(DHT_TYPE, GPIO_PIN, (err, temperature, humidity) => {
    if (!err) {
      switch(topic) {
        case `${MESSAGES.TEMPERATURE}/get`:
          client.publish(MESSAGES.TEMPERATURE, temperature, { retain: true });
          break;

        case `${MESSAGES.TEMPERATURE}/get`:
          client.publish(MESSAGES.HUMIDITY, humidity, { retain: true });
          break;

        case `${MESSAGES.ALL}/get`:
          client.publish(MESSAGES.ALL, JSON.stringify({temperature, humidity}), { retain: true });
          break;
      }
    }
  });
});

