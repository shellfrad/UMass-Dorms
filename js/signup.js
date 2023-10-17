import * as pouchdb from './pouchdb.js'

const username = document.getElementById('username_field');
const password = document.getElementById('password_field');
const signup = document.getElementById('signup');


signup.addEventListener("click", () => {
    if(username.value !== '' && password.value !== ''){
        pouchdb.signup(username.value, password.value);
        window.location.href = "webpage.html";
        
    }
});