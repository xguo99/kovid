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

  static async getAllData() {
    return db.all(`SELECT * FROM businesses`).catch((err)=> {throw err;});
  }

  static async getBusiMask(name, address){
    return db.get(`SELECT mask FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async addBusiMask(name, address,select){
    return db.run(`UPDATE businesses SET ${db.columnNames.mask}='${select}' WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async getBusiHandSanitizer(name, address){
    return db.get(`SELECT handSanitizer FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async addBusiHandSanitizer(name, address,select){
    return db.run(`UPDATE businesses SET ${db.columnNames.handSanitizer}='${select}' WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async getBusiCovidInfo(name, address){
    return db.get(`SELECT CovidInfo FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async addBusiCovidInfo(name, address, text){
    return db.run(`UPDATE businesses SET ${db.columnNames.CovidInfo}='${text}' WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async getBusiSchedule(name, address){
    return db.get(`SELECT monday,tuesday,wednesday,thursday,friday,saturday,sunday FROM businesses WHERE ${db.columnNames.businessName}='${name}' 
      AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async addBusiMonday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.monday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }

  static async addBusiTuesday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.tuesday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }

  static async addBusiWednesday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.wednesday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }
  static async addBusiThursday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.thursday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }
  static async addBusiFriday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.friday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }

  static async addBusiSaturday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.saturday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }
  static async addBusiSunday(name,address,schedule){
    return db.run(`UPDATE businesses SET ${db.columnNames.sunday}='${schedule}' WHERE ${db.columnNames.businessName}='${name}'
    AND ${db.columnNames.address}='${address}'`)
    .catch((err)=>{throw err;});
  }

}
module.exports = Business;
