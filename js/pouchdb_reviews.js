//Gabi
//This has all the PouchDB functions for creating and storing dorm reviews

import * as Utilities from './utilities.js'
const db = new PouchDB("reviews");

//review template
/*
var review = {
    user = "",
    dorm_id = "ne_dwight",
    timestamp = Date(),
    rating_overall = 0,
    rating_clean = 0,
    rating_access = 0,
    rating_culture = 0,
    review_body = "",
}
*/

//Create -> adds a given review to the database
export function add_review(review) {
    var cur_date = Utilities.get_current_timedate_string();
    review.timestamp = cur_date;
    var review_id = review.user + "-" + review.dorm_id + "-" + cur_date;
    review._id = review_id;
    db.put(review, (err, res) => {
        if(err) { 
            console.error(err); 
            console.log(`Could not add ${review_id}!`)
        }
        else {
            console.log(`Added review ${review_id}`);
        }
    })
}

function delete_review(review_id) {
    const review = db.get(review_id, (err, doc) => {
        if(err) {
            console.error(err);
            console.log(`Could not find ${review_id}!`)
        }
        else {
            console.log(`Found ${review_id}, attempting to delete...`);
        }
    })
    db.remove(review._id, review.rev, (err) => {
        if(err) { 
            console.error(err);
            console.log(`Could not delete ${review_id}!`)
        }
        else {
            console.log(`Deleted ${review_id}`)
        }
    })
}

//Get -> gets a review from the db given the id
function get_review_from_id(_id) {
    return new Promise((resolve, reject) => {
        db.get(_id).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            console.error(err);
            console.log(`Could not get ${_id}!`);
        })
    });
}

//Query -> queries all reviews that match the given dorm_id
function query_review_ids_from_dorm_id(_dorm_id) {
    return new Promise((resolve, reject) => {
        db.query((doc, emit) => {
            emit(doc.name);
        }, {dorm_id: _dorm_id}).then((result) => {
            resolve(result);
        }).catch((err) => {
            console.error(err);
            console.log(`Unable to query reviews of dorm_id: ${_dorm_id}`);
        })
    });
}

//returns a Promise array of all full reviews matching the given dorm_id
/*
    Example Usage:
    get_reviews_from_dorm_id("ne_dwight").then((reviews) => { console.log(reviews); })
*/
export function get_reviews_from_dorm_id(_dorm_id) {
    return query_review_ids_from_dorm_id(_dorm_id).then((query) => {
        var promises = query.rows.map((queried_review) => {
            return get_review_from_id(queried_review.id);
        });
        return Promise.all(promises);
    });    
}