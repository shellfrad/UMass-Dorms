//Gabi
//This is the companion .js for dorm_reviews.html

import * as DB_reviews from './pouchdb_reviews.js';
import * as Utilities from './utilities.js';

let dorm_id = localStorage.getItem("dorm_id");
if(dorm_id == "undefined") { window.location.href = "webpage.html"; }
let dorm_data = Utilities.get_dorm_info_from_dorm_id(dorm_id);
let area_data = Utilities.get_area_info_from_dorm_id(dorm_id);

let bg_image = area_data.bg_image;

let div_bg_image = document.getElementById("bg_image");
div_bg_image.style = `background-image:url(${bg_image}); background-size: cover; width: 100%; height: 100%; padding-top: 5%; padding-bottom: 50%`;

let text_dorm_name = document.getElementById("dorm_name");
text_dorm_name.innerHTML = dorm_data["name"];

let div_browse_reviews = document.getElementById("div_browse_reviews");
let div_create_review = document.getElementById("div_create_review");

let button_leave_review = document.getElementById("button_leave_review");
button_leave_review.addEventListener("click", () => {
    init_leave_review(div_create_review);
})

//dropdown menu eventlisteners
let dropdown_item_overall = document.getElementById("dropdown_item_overall");
dropdown_item_overall.addEventListener("click", () => {
    dropdown_switch_to("overall");
})
let dropdown_item_clean = document.getElementById("dropdown_item_clean");
dropdown_item_clean.addEventListener("click", () => {
    dropdown_switch_to("clean");
})
let dropdown_item_access = document.getElementById("dropdown_item_access");
dropdown_item_access.addEventListener("click", () => {
    dropdown_switch_to("access");
})
let dropdown_item_culture = document.getElementById("dropdown_item_culture");
dropdown_item_culture.addEventListener("click", () => {
    dropdown_switch_to("culture");
})
let selected_category = "overall";
let dropdown_host = document.getElementById("dropdown_host")

function dropdown_switch_to(category) {
    selected_category = category;
    dropdown_host.innerHTML = "Sort By: ";
    if(category == "overall") { dropdown_host.innerHTML += "Overall"; }
    else if(category == "clean") { dropdown_host.innerHTML += "Cleanliness"; }
    else if(category == "access") { dropdown_host.innerHTML += "Accessibility"; }
    else if(category == "culture") { dropdown_host.innerHTML += "Dorm Culture"; }
    init_browse_reviews(div_browse_reviews);
}

async function fetch_reviews(dorm_id) {
    return new Promise((resolve, reject) => {
        DB_reviews.get_reviews_from_dorm_id(dorm_id).then((reviews) => { 
            let ret_arr = [];
            for(var i = 0; i < reviews.length; i++) {
                if(reviews[i].dorm_id == dorm_id) {
                    ret_arr.push(reviews[i]);
                }
            }
            resolve(ret_arr);
        });
    })
}

function sort_reviews(reviews, category) {
    category = "rating_" + category;
    let sorted_reviews = reviews.sort((a, b) => (a[category] < b[category]) ? 1 : (a[category] > b[category] ? -1: 0));
    return sorted_reviews;
}


//calculate average star values
function calc_averages(reviews) {
    var _avg_overall = 0;
    var _avg_clean = 0;
    var _avg_access = 0;
    var _avg_culture = 0;
    for(var i = 0; i < reviews.length; i++) {
        _avg_overall += reviews[i]["rating_overall"];
        _avg_clean += reviews[i]["rating_clean"];
        _avg_access += reviews[i]["rating_access"];
        _avg_culture += reviews[i]["rating_culture"];
    }
    _avg_overall /= reviews.length;
    _avg_clean /= reviews.length;
    _avg_access /= reviews.length;
    _avg_culture /= reviews.length;
    return {
        avg_overall: _avg_overall,
        avg_clean: _avg_clean,
        avg_access: _avg_access,
        avg_culture: _avg_culture,
    };
}

//initialize page for browsing reviews
async function init_browse_reviews(div_host) {
    button_leave_review.disabled = false;
    button_leave_review.classList.remove("disabled");
    dropdown_host.disabled = false;
    dropdown_host.classList.remove("disabled");
    div_browse_reviews.disabled = false;
    div_browse_reviews.classList.remove("disabled");
    div_create_review.disabled = true;
    div_create_review.classList.add("disabled");
    div_host.parentNode.insertBefore(div_host, div_create_review);

    div_host.innerHTML = "";

    let reviews = await fetch_reviews(dorm_id);
    reviews = sort_reviews(reviews, selected_category);
    let average_ratings = calc_averages(reviews);

    const div_star_ratings = document.createElement("div");
    for(var i = 0; i < 4; i++) {
        const div = document.createElement("div");
        div.style.cssText += "margin: 0 auto; width: 100%; text-align: center";
        const text = document.createElement("a");
        text.style.cssText += "font-weight: bold; font-size: 18px";
        if(i == 0) { text.innerHTML = "Average Overall Rating: " + Utilities.value_to_star_rating(average_ratings.avg_overall); }
        else if(i == 1) { text.innerHTML = "Average Cleanliness: " + Utilities.value_to_star_rating(average_ratings.avg_clean); }
        else if(i == 2) { text.innerHTML = "Average Accessibility: " + Utilities.value_to_star_rating(average_ratings.avg_access); }
        else if(i == 3) { text.innerHTML = "Average Dorm Culture: " + Utilities.value_to_star_rating(average_ratings.avg_culture); }
        div.appendChild(text);
        div_star_ratings.appendChild(div);
    }
    div_host.appendChild(div_star_ratings);

    const div_reviews = document.createElement("div");
    
    for(var i = 0; i < reviews.length; i++) {
        const div_review = document.createElement("div");
        div_review.classList.add("review");

        //left side of review (username, date posted)
        const div_left = document.createElement("div");
        div_left.style.cssText = "float: left; width: 10%; height: 100%; border-right: 1px solid black; text-align: center; margin-bottom: -1000px; padding-bottom: 1000px";

        var br = document.createElement("br"); div_left.appendChild(br);
        const text_username = document.createElement("a");
        text_username.style.cssText = "font-weight: bold;"
        text_username.innerHTML = reviews[i]["user"];
        div_left.appendChild(text_username);
        var br = document.createElement("br"); div_left.appendChild(br);
        var br = document.createElement("br"); div_left.appendChild(br);
        const text_date = document.createElement("a");
        text_date.innerHTML = reviews[i]["timestamp"].slice(9);
        div_left.appendChild(text_date);

        div_review.appendChild(div_left);

        //center of review (star ratings)
        const div_center = document.createElement("div");
        div_center.style.cssText = "margin: 0 auto; width: 25%; height: 100%; padding-left: 5px";

        //review's star ratings
        const text_rating_overall = document.createElement("a");
        text_rating_overall.innerHTML = "Overall Rating: " + Utilities.value_to_star_rating(reviews[i]["rating_overall"]);
        div_center.appendChild(text_rating_overall);
        var br = document.createElement("br"); div_center.appendChild(br);
        const text_rating_clean = document.createElement("a");
        text_rating_clean.innerHTML = "Cleanliness Rating: " + Utilities.value_to_star_rating(reviews[i]["rating_clean"]);
        div_center.appendChild(text_rating_clean);
        var br = document.createElement("br"); div_center.appendChild(br);
        const text_rating_access = document.createElement("a");
        text_rating_access.innerHTML = "Accessibility Rating: " + Utilities.value_to_star_rating(reviews[i]["rating_access"]);
        div_center.appendChild(text_rating_access);
        var br = document.createElement("br"); div_center.appendChild(br);
        const text_rating_culture = document.createElement("a");
        text_rating_culture.innerHTML = "Dorm Culture Rating: " + Utilities.value_to_star_rating(reviews[i]["rating_culture"]);
        div_center.appendChild(text_rating_culture);

        div_review.appendChild(div_center);

        //right side of review (body)
        const div_right = document.createElement("div");
        div_right.style.cssText = "float: right; width: 65%; height: 100%; border-left: 1px solid black; margin-bottom: -1000px; padding-bottom: 1000px; padding-left: 5px";
        const text_review = document.createElement("a");
        text_review.innerHTML = reviews[i]["review_body"];
        div_right.appendChild(text_review);
        div_review.appendChild(div_right);



        div_reviews.appendChild(div_review);
    }
    div_host.appendChild(div_reviews);
}

//initialize page for leaving a review
function init_leave_review(div_host) {
    button_leave_review.disabled = true;
    button_leave_review.classList.add("disabled");
    dropdown_host.disabled = true;
    dropdown_host.classList.add("disabled");
    div_browse_reviews.disabled = true;
    div_browse_reviews.classList.add("disabled");
    div_create_review.disabled = false;
    div_create_review.classList.remove("disabled");
    div_host.parentNode.insertBefore(div_host, div_browse_reviews);
}

//default page to browsing reviews
init_browse_reviews(div_browse_reviews);


function getData(form) {
    var formData = new FormData(form);
    return Object.fromEntries(formData);
}

document.getElementById("form_review").addEventListener("submit", function(e) {
    e.preventDefault();
    var review_data = getData(e.target);
    if(review_data.overall_rating < 0) { review_data.overall_rating = 1; }
    if(review_data.clean_rating < 0) { review_data.clean_rating = 1; }
    if(review_data.access_rating < 0) { review_data.access_rating = 1; }
    if(review_data.culture_rating < 0) { review_data.culture_rating = 1; }

    var review = {
        user: "Sam the Minuteman",
        dorm_id: dorm_id,
        timestamp: Utilities.get_current_timedate_string(),
        rating_overall: review_data.overall_rating,
        rating_clean: review_data.clean_rating,
        rating_access: review_data.access_rating,
        rating_culture: review_data.culture_rating,
        review_body: review_data.rating_body,
    }

    DB_reviews.add_review(review);

    init_browse_reviews(div_browse_reviews);
})