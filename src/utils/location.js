// const location = process.argv[2];

const request = require("request");

const API_KEY = "e0a5e87953faa3508305ecae7d36edfb";

const location = (search, callback) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`;

  request({ url: url, json: true }, (err, { body }) => {
    const { cod, message } = body;
    // console.log("body", body);
    if (err) return err;
    else if (cod == 400 || cod == 404 || body.length === 0)
      return callback("No data found", undefined);
    else {
      const { lon, lat } = body[0];
      return callback(undefined, {
        lon,
        lat,
      });
    }
  });
};

module.exports = location;
