const db = require('../db/db_config');;

/**
 * @typedef Business
 * @prop name - Business name
 * @prop address - location of the business
 * @prop password - the id of the author who wrote the freet
 */

class Business {
  static async addOne(name, password, businessName, address, status, modification){
    return db.run(`INSERT INTO businesses (
      ${db.columnNames.username}, ${db.columnNames.password}, ${db.columnNames.businessName}, ${db.columnNames.address}, ${db.columnNames.status}, ${db.columnNames.modification})
      VALUES ('${name}', '${password}', '${businessName}', '${address}', '${status}', '${modification}');`)
      .catch((err) => {throw err;});
  }
  static async getOne(name, password){
    return db.get(`SELECT * FROM businesses WHERE ${db.columnNames.username}='${name}' 
      AND ${db.columnNames.password}='${password}'`)
      .catch((err)=> {throw err;});
  }
}
module.exports = Business;
