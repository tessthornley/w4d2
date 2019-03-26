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

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = process.argv[4];

function addPerson (firstName, lastName, birthdate) {
  knex('famous_people').insert({first_name : firstName, last_name : lastName, birthdate : birthdate})
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log('Success');
    knex.destroy();
  });;
}

addPerson(firstName,lastName,birthdate);