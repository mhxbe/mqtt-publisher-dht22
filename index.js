const sensor = require('node-dht-sensor');

const DHT_TYPE = 22;
const GPIO_PIN = 4;

sensor.read(DHT_TYPE, GPIO_PIN, (err, temperature, humidity) => {
  if (!err) {
    console.log(`Temperature: ${temperature.toFixed(1)}°C`);
    console.log(`Humidity: ${humidity.toFixed(1)}%`);
  }
});
