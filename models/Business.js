const db = require('../db/db_config');;

/**
 * @typedef Business
 * @prop name - Business name
 * @prop address - location of the business
 * @prop password - the id of the author who wrote the freet
 */

class Business {
  static async addOne(name, password, address){
    return db.run(`INSERT INTO businesses (
      ${db.columnNames.businessName}, ${db.columnNames.businessPassword}, ${db.columnNames.address})
      VALUES ('${name}', '${address}', '${password}');`)
      .catch((err) => {throw err;});
  }
  static async signIn(name, password, address){
    return db.get(`SELECT * FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.businessPassword}='${password}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }
}
module.exports = Business;
