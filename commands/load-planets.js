const { parse } = require('csv-parse');
const fs = require('fs');
const planetsService = require('../services/planets.service.js')

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

fs.createReadStream('./data/koi_data.csv')
   //pipe the stream to the CSV parser to break the data stream into rows
   .pipe(parse({
      comment: '#',
      columns: true
   }))
   //process each row of data
   .on('data', (data) => {
      total_planets++;
      if(isHabitable(data)) {
         planetsService.addPlanet(data);
      }
   })
   .on('error', (error) => {
      console.log(error);
   })
   .on('end', () => {
      //console log a report of all habitable planets.
      planetsService.getPlanets().map((planet) => {
         console.log(`${planet['kepler_name']} may be habitable.`);
      });
      console.log(`HABITABLE PLANETS: ${planetsService.getPlanets().length}/${total_planets}`);
   });
