const { all } = require('../db/db_config');
const db = require('../db/db_config');;

/**
 * @typedef Review
 * @prop reviewer - username
 * @prop business - business to be reviewed
 * @prop serviceRating - rating for service
 * @prop covidRating - rating for covid
 * @prop comment - review comment by username
 * @prop reply - reply from business
 */

class Review {
  static async addOne(username, business, address, serviceRating, covidRating, comment){
    return db.run(`INSERT INTO reviewreply (
      ${db.columnNames.reviewer}, ${db.columnNames.businessName}, ${db.columnNames.address}, ${db.columnNames.serviceRating}, ${db.columnNames.covidRating}, ${db.columnNames.comment}, ${db.columnNames.reviewTime})
      VALUES ('${username}', '${business}', '${address}', '${serviceRating}', '${covidRating}', '${comment}', NOW());`)
      .catch((err) => {throw err;});
  }
  static async getAllForBusi(business, address){
    return db.all(`SELECT * FROM reviewreply WHERE ${db.columnNames.businessName}='${business}' 
        AND ${db.columnNames.address}='${address}'`)
      .catch((err)=> {throw err;});
  }

  static async getAllByCust(username){
    return db.all(`SELECT * FROM reviewreply WHERE ${db.columnNames.reviewer}='${username}'`)
      .catch((err)=> {throw err;});
  }

  static async getReviewData(business, address){
    const allReviews=await this.getAllForBusi(business, address);
    const allServiceRatings=allReviews.map(reviews=>reviews.servicerating);
    console.log(allServiceRatings);
    const allCovidRatings=allReviews.map(reviews=>reviews.covidrating);
    console.log(allCovidRatings);
    const serviceRating=this.calculateRating(allServiceRatings);
    const covidRating=this.calculateRating(allCovidRatings);
    return {allReviews,serviceRating,covidRating};
  }

  static calculateRating(allRatings){
    if(allRatings===null || allRatings.length==0){return "N/A"}
    let rating=0;
    allRatings.forEach(r=>{rating+=r;});
    return rating/allRatings.length;
  }
}
module.exports = Review;
