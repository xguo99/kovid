const db = require('../db/db_config');

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

  static async getBusiName(name, password){
    return db.get(`SELECT businessname FROM businesses WHERE ${db.columnNames.username}='${name}' 
      AND ${db.columnNames.password}='${password}'`)
      .catch((err)=> {throw err;});
  }

  static async getBusiAddress(name, password){
    return db.get(`SELECT address FROM businesses WHERE ${db.columnNames.username}='${name}' 
      AND ${db.columnNames.password}='${password}'`)
      .catch((err)=> {throw err;});
  }

  static async getBusiDescription(name, address){
    return db.get(`SELECT description FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async addBusiDescription(name, address,text){
    return db.run(`UPDATE businesses SET ${db.columnNames.description}='${text}' WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async getBusiCategory(name, address){
    return db.get(`SELECT category FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async addBusiCategory(name, address,select){
    return db.run(`UPDATE businesses SET ${db.columnNames.category}='${select}' WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }
}
module.exports = Business;
