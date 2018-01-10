let userDBHelper

module.exports = injectedUserDBHelper => {
  userDBHelper = injectedUserDBHelper;

  return {registerUser: registerUser};
}

function isString(parameter) {
  return parameter != null && (typeof parameter === "string" || parameter instanceof String) ? true : false;
}

function sendResponse(res, message, error) {
  res
    .status(error != null ? error != null ? 400 : 200 : 400)
    .json({
      'message': message,
      'error': error,
    });
}

function registerUser(req, res){
  const username = req.body.username
  const password = req.body.password

  if (!isString(username) || !isString(password)) { return sendResponse(res, "Invalid Credentials", true); }

  userDBHelper.doesUserExist(username)
    .then(doesUserExist => {
      if (doesUserExist === false) {
        userDBHelper.registerUserInDB(username, password);
        sendResponse(res, "Registration was successful", null));
      } else {
        throw new Error('User already exists');
      }
    }).catch(error => {
      sendResponse(res, "Failed to register user" , error);
    });
}
