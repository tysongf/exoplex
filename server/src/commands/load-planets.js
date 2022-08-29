const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('../models/planets.model.js');

const min_insol = 0.36; //minimum insolation flux
const max_insol = 1.11; //maximum insolation flux
const max_prad = 1.6;   //maximum planetary radius
var total_planets = 0;  //total number of planets analyzed

function isHabitable(planet) {
   return planet['koi_disposition'] === 'CONFIRMED'
       && planet['koi_insol'] >= min_insol
       && planet['koi_insol'] <= max_insol
       && planet['koi_prad'] <= max_prad
}

function loadPlanetsData() {
   return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '..', '..', 'data', '/koi_data.csv'))
      //pipe the stream to the CSV parser to break the data stream into rows
      .pipe(parse({
         comment: '#',
         columns: true
      }))
      //process each row of data
      .on('data', (data) => {
         total_planets++;
         if(isHabitable(data)) {
            planets.push(data);
         }
      })
      .on('error', (error) => {
         console.log(error);
         reject(error);
      })
      .on('end', () => {
         //console log a report of all habitable planets.
         console.log(`Planets Loaded: ${planets.length}/${total_planets}`);
         resolve();
      });
   });
   
}

module.exports = loadPlanetsData;
