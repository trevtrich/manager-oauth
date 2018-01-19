import {users} from '../user-db';

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

export default function registerUser(req, res){
  const username = req.body.username
  const password = req.body.password

  if (!isString(username) || !isString(password)) { return sendResponse(res, "Invalid Credentials", true); }

  if (users.includes(username)) {
    throw new Error('User already exists')
  } else {
    users.push(username);
    sendResponse(res, "Registration was successful", null);
  }
}
