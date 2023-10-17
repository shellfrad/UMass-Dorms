const users = new PouchDB('mydb');  

//Create -> Singup
function signup(user, pass){
    user = { _id: user, password: pass};
    users.put(user, function(err, res){ 
        if(err){
            console.log(err);
        }else{
            console.log('User added');
        }
    });
}

//Read -> Log in
async function login(username, pass){
  try {
      var userlogin = await users.get(username);
    } catch (err) {
      console.log(err);
      console.log("User does not exist");
    }
  
    if(userlogin.password === pass){
      console.log("User Can log in");
      return true; 
      }else{
      console.log("User can NOT log in, incorrect password");
      return false; 
      }
}

//Update -> Change username, password
async function changeUser(username, password, newUser, newPass, toChange){
  //toChange = true -> change username 
  //toChange = false -> change password
  try{
      var userUpdate = await users.get(username);
      console.log("Found");
  }
  catch(err) {
      console.log(err);
      console.log("User does not exist");
  }

  if(toChange){
  try{
      var response = await users.put({
          _id: newUser,
          _rev: userUpdate._rev,
        });
  }
      catch(err) {
          console.log(err);
      }
  }
  else{
      try{
          var response = await users.put({
              _id: userUpdate._id,
              _rev: userUpdate._rev,
              password: newPass
            });
      }
          catch(err) {
              console.log(err);
          }
      }
}


//Delete -> Delete user
async function deleteUser(username){
  try {
      var user = await users.get(username);
      var response = await users.remove(user._id, user._rev);
      console.log("User deleted!"); //Note: Not necessarily in order, pay attention to when printed
    } catch (err) {
      console.log(err);
    }
}

async function printUser(username){
  try {
      var user = await users.get(username);
      console.log(user);
    } catch (err) {
      console.log(err);
      console.log("User does not exist");
    }
}

export{
  login,
  signup, 
  changeUser, 
  deleteUser
};