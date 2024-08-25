import process from "process";
// Create token and save in the cookie
export default (user, statusCode, res) => {
  // Create the JWT Token
  const token = user.getJwtToken();

  // Prepare options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("ACCESS_TOKEN", token, options).json({ token });
};
