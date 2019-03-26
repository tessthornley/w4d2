const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect( );

const name = process.argv[2];

function getReults(name) {
  // Assuming user will have exact first or last name, otherwise can switch function to concat the text with % on either side
  client.query(`SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`, [name], function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    printReults(result);
    client.end();
  });
}

function printReults(input) {
  console.log('Searching...');
  console.log(`Found ${input.rows.length} person(s) by the name '${name}'`);
  
  input.rows.forEach( function (row, index) {
  console.log(`- ${index+1}: ${row.first_name} ${row.last_name}, born '${formatDate(row.birthdate)}'`);
  });
}

function formatDate(date) {
  let newDate = new Date(date).toISOString().slice(0,10);
  return newDate;
}

getReults(name);