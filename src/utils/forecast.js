const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/032586bbeb56b052c964cc54d24af50f/${lat},${long}?units=uk2`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather services.', undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(
        undefined,
        `${body.currently.summary}. It is ${
          body.currently.temperature
        } degrees, and there is a ${
          body.currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
