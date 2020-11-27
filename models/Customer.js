const db = require('../db/db_config');

class Customer {
  /**
   * Add a Customer.
   * 
   * @param {string} name
   * @param {string} password
   * @return {Customer} - created user
   */
  static async addOne(name, password) {
    // first insert the user into the db then fetch the user from the DB
    return db.run(`INSERT INTO customers (${db.columnNames.username}, ${db.columnNames.password}) VALUES ('${name}', '${password}')`)
              .then( () => {
                return Customer.findOne(name);
              });
  }

  /**
   * Find a Customer by name.
   * @param {string} name - name of User to find
   * @return {Customer | undefined} - found User
   */
  static async findOne(name) {
    return db.get(`SELECT * FROM customers WHERE ${db.columnNames.username} = '${name}'`);
  }

  static async changeUsername(name, newname){
      return db.run(`UPDATE customers SET ${db.columnNames.username} = '${newname}' 
                    WHERE ${db.columnNames.username} = '${name}'`)
              .then(() => {
                return db.run(`UPDATE reviewreply SET ${db.columnNames.reviewer} = '${newname}' 
                WHERE ${db.columnNames.reviewer} = '${name}'`)
              });
  }

  static async changePassword(name, newPassword){
      return db.run(`UPDATE customers SET ${db.columnNames.password} = '${newPassword}'
                    WHERE ${db.columnNames.username} = '${name}'`);
  }

  /**
   * checks if username and password match
   * @param {string} name 
   * @param {string} password 
   * @returns {boolean} true if matches, false otherwise
   */
  static async checkAuthentication(name, password){
    return db.get(`SELECT ${db.columnNames.password} FROM customers WHERE username = '${name}';`)
    .then(res => { return res.password === password; })
    .catch(() => { return false; });
  }
}

module.exports = Customer;
