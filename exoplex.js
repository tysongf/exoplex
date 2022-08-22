const { parse } = require('csv-parse');
const fs = require('fs');

const planets = [];

fs.createReadStream('./data/koi_data.csv')
   .on('data', (data) => {
      planets.push(data);
   })
   .on('error', (error) => {
      console.log(error);
   })
   .on('end', () => {
      console.log(planets);
      console.log('DONE');
   });