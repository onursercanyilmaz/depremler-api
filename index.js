const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const regions = require("./regions");

app.use(cors());

app.get("/earthquake", (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const minlat = req.query.minlat;
  const maxlat = req.query.maxlat;
  const minlon = req.query.minlon;
  const maxlon = req.query.maxlon;
  const minmag = req.query.minmag;

  axios
    .get(
      `https://deprem.afad.gov.tr/apiv2/event/filter?minlat=${minlat}&maxlat=${maxlat}&minlon=${minlon}&maxlon=${maxlon}&start=${start}&end=${end}&limit=10000&orderby=timedesc&minmag=${minmag}`
    )
    .then((response) => {
      if (response.data.length == 0) {
        res.status(200).send([
          {
            rms: "null",
            eventID: "null",
            location: "null",
            latitude: "null",
            longitude: "null",
            depth: "null",
            type: "null",
            magnitude: "null",
            country: "null",
            province: "null",
            district: "null",
            neighborhood: "null",
            date: "null",
            isEventUpdate: "null",
            lastUpdateDate: "null",
          },
        ]);
      } else {
        res.status(200).send(response.data);
      }
    })
    .catch((error) => {
      res.status(400).send([
        {
          rms: "null",
          eventID: "null",
          location: "null",
          latitude: "null",
          longitude: "null",
          depth: "null",
          type: "null",
          magnitude: "null",
          country: "null",
          province: "null",
          district: "null",
          neighborhood: "null",
          date: "null",
          isEventUpdate: "null",
          lastUpdateDate: "null",
          error: error,
        },
      ]);
      res.status(500).send([
        {
          rms: "null",
          eventID: "null",
          location: "null",
          latitude: "null",
          longitude: "null",
          depth: "null",
          type: "null",
          magnitude: "null",
          country: "null",
          province: "null",
          district: "null",
          neighborhood: "null",
          date: "null",
          isEventUpdate: "null",
          lastUpdateDate: "null",
          error: error,
        },
      ]);
      console.log(error);
    });
});

app.get("/earthquake/:id", (req, res) => {
  const id = req.params.id;

  axios
    .get(`https://deprem.afad.gov.tr/apiv2/event/filter?eventid=${id}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(400).send({
        rms: null,
        eventID: null,
        location: null,
        latitude: null,
        longitude: null,
        depth: null,
        type: null,
        magnitude: null,
        country: null,
        province: null,
        district: null,
        neighborhood: null,
        date: null,
        isEventUpdate: null,
        lastUpdateDate: null,
        error: error,
      });
      res.status(500).send({
        rms: null,
        eventID: null,
        location: null,
        latitude: null,
        longitude: null,
        depth: null,
        type: null,
        magnitude: null,
        country: null,
        province: null,
        district: null,
        neighborhood: null,
        date: null,
        isEventUpdate: null,
        lastUpdateDate: null,
        error: error,
      });
      console.log(error);
    });
});

app.get("/regions", (req, res) => {
  res.status(200).json(regions);
});

app.listen(process.env.PORT || 8000, () =>
  console.log(`server running on PORT ${PORT}`)
);
