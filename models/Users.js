let listOfUsers = [];
let uid_counter = 0;


/**
 * @typedef Users
 * @prop {number} uid - unique user id
 * @prop {string} username - username of the user
 * @prop {string} password - password of the user
 * @prop {Array} freets - Array of freets posted by user chronological order
 */

/**
 * @class Users
 * Stores content for a User.
 * Wherever you import this class, you will be accessing data for a specific User
 */
class Users {

  // creates a new user
  constructor(username, password){
    this.uid = uid_counter;
    this.freetCounter = 0; // not equal to total freets
    this.username = username;
    this.password = password;
    this.freets = [];
    this.following = new Set();
    this.upvotedFreets = new Set(); //set of {author, freetID} objects
    this.nextFreetID = () => {return ++this.freetCounter;}
    uid_counter++;
  }

  /**
   * Find a User by username.
   * @param {string} username - username of User to find
   * @return {Short | undefined} - found User | User with username does not exist
   */
  static findUser(username) {
    return listOfUsers.filter(user => user.username === username)[0];
  }

  /**
   * Find a User by uid.
   * @param {string} uid - uid of User to find
   * @return {User | undefined} - found User | User with uid does not exist
   */
  static findUserID(uid) {
    return listOfUsers.filter(user => user.uid === uid)[0];
  }

  /**
   * Create a User.
   * @param {string} username - username; must be unique among all users
   * @param {string} password - password for the User
   * @return {User | undefined} - created User | Username already exists.
   */
  static createUser(username, password) {
    username = username.trim();
    if (Users.findUser(username) !== undefined){
        return undefined;
    }
    const user = new Users(username, password);
    listOfUsers.push(user);
    return user;
  }

  /**
   * Sign in a User.
   * @param {string} username - username of User to sign in
   * @param {string} password - password of a User to sign in
   * @return {User | undefined} - User matching username and password | no Users match sign in
   */
  static signInUser(username, password) {
    username = username.trim();
    const user = listOfUsers.filter(user => 
      user.username === username 
      && user.password == password
    )[0];
    return user;
  }

  /**
   * Gets all freets 
   * @return {Array} - Array of freets 
   */
  static getAllFreets(){
    // gets all freets, sorted by newest first.
    return Users.getAllFreetsList(listOfUsers);
  }

  /**
   * Gets all freets for users in the list
   * @param list - list of usernames to get the freets of
   * @return {Array} - Array of freets 
   */
  static getAllFreetsList(list){
    // gets all freets, sorted by newest first.
    return list
    .map(user => Users.getFreetsByUser(user.username))
    .reduce((l1,l2) => l1.concat(l2), [])
    .sort((freet1,freet2) => freet2.time - freet1.time);
  }
  
  /**
   * Gets all freets of a User with username
   * @param {string} username - username of User to return freets for
   * @return {Array} - Array of freets 
   */
  static getFreetsByUser(username){
    username = username.trim();
    const user = Users.findUser(username);
    if (user === undefined) return undefined;
    const freets = user.freets;
    
    // returns freet with better format 
    return freets.map(freet => {
      let reFreetStatus = "";
      if (freet.reFreet !== false){
        reFreetStatus = Users.findUserID(freet.reFreet);
        if (reFreetStatus===undefined){
          reFreetStatus = "Original user has been deleted."
        } else if (reFreetStatus) {
          reFreetStatus = `Refreet @${reFreetStatus.username}`;
        } 
      } else {
        reFreetStatus = 'Original Freet';
      }
      

      return{
        author: username,
        content: freet.text.text,
        userFreetID: freet.id,
        time: freet.time,
        upvotes: freet.upvote.size,
        upvoters: [...freet.upvote],
        edited: freet.edited.edited ? `Number of edits: ${freet.edited.edited}` : "Unedited Freet",
        reFreet: reFreetStatus
      };
    })
    .sort((freet1,freet2) => freet2.time - freet1.time);
  }

  /**
   * Adds freet to User
   * @param {Freet} freet - freet composed by User
   * @return {User} - current User
   */
  addFreet(freet){
    this.freets.push(freet);
    return this;
  }

  /**
   * Remove freet to User
   * @param {Freet} remFreetId - freet to be removed for User
   * @return {User} - current User
   */
  removeFreet(remFreetId){
    const removed = this.freets.filter(freet => freet.id === remFreetId)[0];
    removed.deleteFreet();

    this.freets = this.freets.filter(freet => freet.id !== remFreetId);
    return this;
  }

  /**
   * Gets all freets for user
   * @return {Array} - all freets for user
   */
  getMyFreets(){
    return this.freets;
  }

  /**
   * Gets a user's freet by freetId
   * @param {number} freetId - id of the freet being retrieved
   * @return {Array} - all freets for user
   */
  getFreetbyId(freetId){
    const freets = this.getMyFreets();
    return freets.filter(freet => freet.id === freetId)[0];
  }


  /**
   * Toggle the following of a user.
   * @param {String} username - username of the user to follow
   */
  followUser(username) {
    const user = Users.findUser(username);

    if (user === undefined){
      return undefined;
    }

    // Toggle follow/unfollow
    if (this.following.has(user.uid)){
      this.following.delete(user.uid);
      return false;
    } else {
      this.following.add(user.uid);
      return true;
    }
  }

  /**
   * Returns the list of users the current user is following.
   */
  getMyFollowing() {
    return [...this.following]
    .map(id => Users.findUserID(id))
    .filter(user => user !== undefined)
  }

  /**
   * @return {Array} returns the freets of all the users you are following 
   *  in reverse chronological order
   */
  getFreetFeed() {
    return Users.getAllFreetsList(this.getMyFollowing());
  }


  /**
   * Update User username.
   * @param {string} newUsername - new username to change to for User
   * @return {User | undefined} - updated User | newUsername already exists
   */
  static updateUsername(uid, newUsername) {
    newUsername = newUsername.trim();

    if (Users.findUser(newUsername) !== undefined){
      return undefined;
    }
    const user = Users.findUserID(uid);
    user.username = newUsername;
    return user;
  }

  /** 
   * Update User password.
   * @param {number} uid - uid of the user that we are changing the password of
   * @param {string} newPassword - new password to change to for User
   * @return {User | undefined} - updated User password | password not valid
   */
  static updatePassword(uid, newPassword) {
    if (newPassword.length < 6){
      return undefined;
    }
    const user = Users.findUserID(uid);
    user.password = newPassword;
    return user;
  }

  /**
   * Delete a User
   * @param {number} uid - uid of the User being deleted
   * @return {User | undefined} - deleted User | user has already been deleted
   */
  static deleteUser(uid) {
    const user = Users.findUserID(uid);

    // deletes all freets of a user. Does not remove the association from the user.
    user.freets.map(freet => freet.deleteFreet());
    listOfUsers = listOfUsers.filter(s => s.uid !== uid);
    return this;
  }
}

module.exports = Users;