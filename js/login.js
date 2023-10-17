import * as pouchdb from './pouchdb.js'

const username = document.getElementById('username_field');
const password = document.getElementById('password_field');
const login = document.getElementById('login');

login.addEventListener("click", () => {
  if(username.value !== '' && password.value !== ''){
    if(pouchdb.login(username.value, password.value)){
      window.location.href = "webpage.html";
    }
  }
});
