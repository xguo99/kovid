const db = require('../db/db_config');;

/**
 * @typedef Business
 * @prop name - Business name
 * @prop address - location of the business
 * @prop password - the id of the author who wrote the freet
 */

class Business {
  static async addOne(name, password, businessName, address){
    return db.run(`INSERT INTO businesses (
      ${db.columnNames.username}, ${db.columnNames.password}, ${db.columnNames.businessName}, ${db.columnNames.address})
      VALUES ('${name}', '${password}', '${businessName}', '${address}');`)
      .catch((err) => {throw err;});
  }
}
module.exports = Business;
