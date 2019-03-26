const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
  }
});

const name = process.argv[2];

function getReults(name) {
  // Assuming user will have exact first or last name, otherwise can switch function to concat the text with % on either side
  knex.select('*').from('famous_people')
  .where('first_name', name)
  .orWhere('last_name', name)
  .asCallback(function(err, rows) {
        if (err) {
          return console.error(err);
        } printReults(rows);
          knex.destroy();
      });
  }

function printReults(input) {
  console.log('Searching...');
  console.log(`Found ${input.length} person(s) by the name '${name}'`);
  
  input.forEach( function (row, index) {
  console.log(`- ${index+1}: ${row.first_name} ${row.last_name}, born '${formatDate(row.birthdate)}'`);
  });
}

function formatDate(date) {
  let newDate = new Date(date).toISOString().slice(0,10);
  return newDate;
}

getReults(name);