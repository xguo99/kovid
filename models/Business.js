const Geo = require('../models/GeoCoder.js');
const db = require('../db/db_config');;

/**
 * @typedef Business
 * @prop name - Business name
 * @prop address - location of the business
 * @prop password - the id of the author who wrote the freet
 */

 /**
 * @class Business
 * Stores informations for a business.
 * Wherever you import this class, you will be accessing data for a specific business
 */
class Business {

    // creates a new user
    constructor(username, password,address){
      this.username = username;
      this.password = password;
      this.address = address;
      this.category = '';
      this.auth=false;
      this.informatipn = []; //get from busi database
    }  

    /**
   * Create a User.
   * @param {string} username - username; 
   * @param {string} password - password for the User
   * @param {string} address  - address for busi, unique
   * @return {Busi | undefined} - created Busi | address already exists.
   */
  createBusi(username, password,address) {
    this.username = username.trim();
    this.password = password;
    this.address = address;
    return this.address;
  }

  

}
module.exports = Business;
