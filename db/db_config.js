require('dotenv').config(); // This allows us to use variables in .env file through process.env
const pgp = require('pg-promise')();
const isProduction = process.env.NODE_ENV === 'production'; // process.env will be used by heroku to provide configs and NODE_ENV will be set to production there.
const localHostConnectionString = `postgresql://${'postgres'}:${'2020'}@${'localhost'}:${5432}/${'postgres'}`; // Make sure your .env file has all your database information for your localhost.

// name the columns of our tables for localization
const columnNames = {
  username: "username",
  password: "password",
  businessName: "businessName",
  address: "address",
  latitude: "latitude",
  longitude: "longitude",
  status: "status",
  description:"description",
  modification: "modification",
  category: "category",
  mask: "mask",
  handSanitizer: "handSanitizer",
  capacity: "capacity",
  reviewer: "reviewer",
  serviceRating: "serviceRating",
  covidRating: "covidRating",
  comment: "comment",
  reviewID: "reviewID",
  reviewTime: "reviewTime",
  reply: "reply"
};

Object.freeze(columnNames);

let pgDb;

function createBusinessDb(){
    pgDb = pgp(isProduction ? process.env.DATABASE_URL : localHostConnectionString);
    createBusinessTable();
    createCustomerTable();
    createReviewReplyTable();
}

function createBusinessTable(){
  return pgDb.none(`CREATE TABLE IF NOT EXISTS businesses (
    ${columnNames.username} TEXT PRIMARY KEY,
    ${columnNames.password} TEXT NOT NULL,
    ${columnNames.businessName} TEXT NOT NULL,
    ${columnNames.address} TEXT UNIQUE NOT NULL,
    ${columnNames.latitude} REAL,
    ${columnNames.longitude} REAL,
    ${columnNames.status} TEXT,
    ${columnNames.description} TEXT,
    ${columnNames.modification} TEXT,
    ${columnNames.category} TEXT,
    ${columnNames.mask} TEXT,
    ${columnNames.handSanitizer} TEXT,
    ${columnNames.capacity} SMALLINT
    )`).then(() => { console.log("Business table created.");});
};

function createCustomerTable(){
  return pgDb.none(`CREATE TABLE IF NOT EXISTS customers (
    ${columnNames.username} TEXT PRIMARY KEY,
    ${columnNames.password} TEXT NOT NULL
  )`).then(() => { console.log("Customer table created.");});
};

function createExtension(){
  return pgDb.none(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    .then(() => { console.log("uuid extension created.");});
};

function createReviewReplyTable(){
  createExtension();
  return pgDb.none(`CREATE TABLE IF NOT EXISTS reviewreply (
    ${columnNames.reviewer} TEXT NOT NULL,
    ${columnNames.businessName} TEXT NOT NULL,
    ${columnNames.address} TEXT NOT NULL,
    ${columnNames.serviceRating} REAL NOT NULL,
    ${columnNames.covidRating} REAL NOT NULL,
    ${columnNames.comment} TEXT NOT NULL,
    ${columnNames.reviewID} uuid DEFAULT uuid_generate_v4(),
    ${columnNames.reviewTime} TIMESTAMPTZ NOT NULL,
    ${columnNames.reply} TEXT
  )`).then(() => { console.log("ReviewReply table created.");});
};

// Helper wrapper functions that return promises that resolve when sql queries are complete.
function run(sqlQuery) {
  //console.log("db run call", sqlQuery); // Adding this log to help with Heroku debugging if needed.
  return pgDb.none(sqlQuery);
}

function get(sqlQuery) {
  //console.log("db get call", sqlQuery); // Adding this log to help with Heroku debugging if needed.
  return pgDb.oneOrNone(sqlQuery);
}

function all(sqlQuery) {
  //console.log("db all call", sqlQuery); // Adding this log to help with Heroku debugging if needed.
  return pgDb.any(sqlQuery);
}

createBusinessDb();

module.exports = {
  columnNames,
  run,
  get,
  all,
};
