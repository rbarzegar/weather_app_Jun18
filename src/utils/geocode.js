const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoicm9sYW5kYmFyemVnYXIiLCJhIjoiY2p3YjBsYTN1MDg1bzQ5bzF1NHZybWV6NiJ9.zQ-9t4JmF_RUqqdDSXmMmw&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find a location, please try again.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
