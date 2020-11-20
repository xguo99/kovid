require('dotenv').config(); // This allows us to use variables in .env file through process.env
const pgp = require('pg-promise')();
const isProduction = process.env.NODE_ENV === 'production'; // process.env will be used by heroku to provide configs and NODE_ENV will be set to production there.
const localHostConnectionString = `postgresql://${'postgres'}:${'2020'}@${'localhost'}:${5432}/${'postgres'}`; // Make sure your .env file has all your database information for your localhost.

// name the columns of our tables for localization
const columnNames = {
    businessName: "businessName",
    businessPassword: "businessPassword",
    address: "address",
    latitude: "latitude",
    longitude: "longitude",
    status: "status",
    category: "category",
    mask: "mask",
    handSanitizer: "handSanitizer",
    capacity: "capacity",
};

Object.freeze(columnNames);

let pgDb;

function createBusinessDb(){
    pgDb = pgp(isProduction ? process.env.DATABASE_URL : localHostConnectionString);
    createBusinessTable();
}

function createBusinessTable(){
    return pgDb.none(`CREATE TABLE IF NOT EXISTS businesses (
        ${columnNames.businessName} TEXT PRIMARY KEY,
        ${columnNames.businessPassword} TEXT NOT NULL,
        ${columnNames.address} TEXT NOT NULL,
        ${columnNames.latitude} REAL,
        ${columnNames.longitude} REAL,
        ${columnNames.status} TEXT NOT NULL,
        ${columnNames.category} TEXT NOT NULL,
        ${columnNames.mask} TEXT NOT NULL,
        ${columnNames.handSanitizer} TEXT NOT NULL,
        ${columnNames.capacity} SMALLINT
      )`).then(() => { console.log("Created Business table!");});
}

// Helper wrapper functions that return promises that resolve when sql queries are complete.
function run(sqlQuery) {
  console.log("db run call", sqlQuery); // Adding this log to help with Heroku debugging if needed.
  return pgDb.none(sqlQuery);
};

function get(sqlQuery) {
  console.log("db get call", sqlQuery); // Adding this log to help with Heroku debugging if needed.
  return pgDb.oneOrNone(sqlQuery);
};

function all(sqlQuery) {
  console.log("db all call", sqlQuery); // Adding this log to help with Heroku debugging if needed.
  return pgDb.any(sqlQuery);
};

createBusinessDb();

module.exports = {
  columnNames,
  run,
  get,
  all,
};
