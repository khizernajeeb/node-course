const express = require("express");
const path = require("path");
const hbs = require("hbs");
const location = require("./utils/location");
const geocode = require("./utils/geocode");

const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "../public")));
// hbs.registerPartials(partialsPath);

app.get("/", function (req, res) {
  res.render("abc");
});

app.get("/about", function (req, res) {
  if (!req.query.search) {
    return res.send({ error: "Please provide params" });
  }
  const search = req.query.search;
  // console.log("search", search);
  location(search, (error, data) => {
    // console.log("AA", data);
    if (error || !data) {
      return res.send({ error: "Unable to search" });
    }
    console.log("locatonData", data);
    const { lat, lon } = data;
    geocode(lat, lon, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      console.log(data);
      // console.log(error);
      // res.render("about");
      res.send({ data, query: req.query.search });
    });
  });

  // res.render("about.hbs", {
  //   title: "About Page",
  // });
});

app.listen(8080, () => {
  console.log("Server is listening on port 3000");
});
