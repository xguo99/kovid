const db = require('../db/db_config');;

/**
 * @typedef Reply
 * @prop reviewer - username
 * @prop business - business to be reviewed
 * @prop serviceRating - rating for service
 * @prop covidRating - rating for covid
 * @prop comment - review comment by username
 * @prop reply - reply from business
 */

class Reply {
  static async addOne(reviewID, reply){
    return db.one(`UPDATE reviewreply SET ${db.columnNames.reply} = '${reply}' 
                    WHERE ${db.columnNames.reviewID} = '${reviewID}'
                    RETURNING ${db.columnNames.reviewID}, ${db.columnNames.reply}`)
      .catch((err) => {throw err;});
  }

  static async getAllByCust(username){
    return db.all(`SELECT * FROM reviewreply 
                    WHERE ${db.columnNames.reviewer}='${username}' AND ${db.columnNames.reply} IS NOT NULL`)
      .catch((err)=> {throw err;});
  }
}
module.exports = Reply;
