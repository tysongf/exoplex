const { parse } = require('csv-parse');
const fs = require('fs');

const min_insol = 0.36; //minimum insolation flux
const max_insol = 1.11; //maximum insolation flux
const max_prad = 1.6;   //maximum planetary radius
var num_planets = 0;

const habitablePlanets = [];

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
      num_planets++;
      if(isHabitable(data)) {
         habitablePlanets.push(data);
      }
   })
   .on('error', (error) => {
      console.log(error);
   })
   .on('end', () => {
      habitablePlanets.map((planet) => {
         console.log(`${planet['kepler_name']} may be habitable.`);
      });
      console.log(`HABITABLE PLANETS: ${habitablePlanets.length}/${num_planets}`);
   });