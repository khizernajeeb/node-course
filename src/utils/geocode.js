const request = require("request");

const geocode = (lat, lon, callback) => {
  const API_KEY = "e0a5e87953faa3508305ecae7d36edfb";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  request({ url, json: true }, (err, res) => {
    console.log("resGeo", res);

    const { body } = res;
    const {
      cod,
      message,
      name: city,
      main: { temp: temperature },
    } = body;
    console.log("bodyGeo", body);
    if (err) return callback("Unable to connet", undefined);
    if (cod === 400 || cod === 404) return callback(message);
    return callback(undefined, {
      city,
      temperature,
    });
  });
};

module.exports = geocode;
