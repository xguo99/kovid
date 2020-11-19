const Users = require('../models/Users');
/**
 * @typedef Freets
 * @prop id - unique freet id
 * @prop text - content of the freet
 * @prop authorId - the id of the author who wrote the freet
 */

/**
 * @class Freets
 * Stores attributes of a freet
 */
class Freets{

    // Create a new Freet object
    constructor(freet, authorId, freetId) {
        if (freet.id){
            // This branch if creating a reFreet
            this.text = freet.text;
            this.edited = freet.edited;
            this.reFreet = freet.username; // will be a username of the original author

        } else {
            // This branch if creating a freet
            this.text = {text: freet};
            this.edited = {edited: 0};
            this.reFreet = false; // will be a username of the original author
        }

        this.id = freetId;
        this.authorId = authorId;
        this.time = Date.now();
        this.upvote = new Set();

    }


    /**
    * Checks if a given author wrote a specific freet
    * @param freet the freet being checked
    * @param userId the id of the user to test against the freets author
    * @return true if the user wrote the freet, otherwise false
    */
    static isAuthor(freet, userId) {
        return (freet.authorId === userId);
    }

    /**
    * Retrieves all freets
    * @return the list of freets
    */
    static viewAllFreets() {
        const all_freets = Users.getAllFreets();
        return all_freets;
    }

    /**
    * Retrieves all freets written by a specific authore
    * @param authorName the author whose freets should be returned
    * @return a list of freets written by given author
    */
    static viewFreetsByAuthor(authorName) {
        return Users.getFreetsByUser(authorName);
    }

    /**
    * Creates a new freet and adds it to the list of all freets
    * @param text the new freets content
    * @param authorId the id of the author who wrote the freet
    * @return the created freet object
    */
    static createFreet(text, authorId) {
        const user = Users.findUserID(authorId);
        const freet = new Freets(text, authorId, user.nextFreetID());
        user.addFreet(freet);
        return freet;
    }

    /**
    * Creates a new freet from a previous Freet. Marks as a refreet
    * @param currentUserId the id of the current user
    * @param authorUsername the username of the author who wrote the freet
    * @param freetId the id of the freet by that author
    * @return the created freet object
    */
    static reFreet(currentUserId, authorUsername, freetId) {
        // get current user
        const user = Users.findUserID(currentUserId);

        // get the freet being refreeted
        const author = Users.findUser(authorUsername);

        if (author === undefined) {
            return undefined;
        }

        const freet = author.getFreetbyId(freetId);

        if (freet === undefined) {
            return undefined;
        }

        const refreet = new Freets(freet, currentUserId, user.nextFreetID(), author.username);
        refreet.reFreet = freet.reFreet ? freet.reFreet : author.uid;
        user.addFreet(refreet);
        return refreet;
    }
    
    /**
     * Upvotes a given freet by the author's username and the selected freet's ID
    * @param currentUserId the id of the current user
    * @param authorUsername the username of the author who wrote the freet
    * @param freetId the id of the freet by that author
     */
    static upvoteFreet(currentUserId, currentUsername, authorUsername, freetId) {
        // get current user
        const user = Users.findUserID(currentUserId);

        // get the author's freets
        const author = Users.findUser(authorUsername);

        if (author === undefined) {
            return undefined;
        } else {
            const freet = author.getFreetbyId(freetId);

            if (freet === undefined) {
                return undefined;
            } else {
                // toggle upvote/un-upvote
                if (freet.upvote.has(currentUsername)) {
                    freet.upvote.delete(currentUsername);
                    author.upvotedFreets.delete({author: authorUsername, freetId: freetId});
                    return freet;
                } else {
                    freet.upvote.add(currentUsername);
                    user.upvotedFreets.add({author: authorUsername, freetId: freetId});
                    return freet;
                }
            }
        }
    }

    /**
    * Edits a specific freet, only the original author may edit
    * @param newText the new desired content of the freet
    * @return the new freet if the edit is successful
    */
    editFreet(newText) {
        if (this.reFreet) return undefined;
        this.edited.edited++;
        this.text.text = newText;
        return this;
    }

    /**
    * Deletes a specific freet, only the original author may delete
    * @return True if successful
    */
    deleteFreet() {
        if (!this.reFreet){
            this.text.text = "The original freet has been deleted"
            this.edited.edited++;
        }
    }
}

module.exports = Freets;
