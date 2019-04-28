var createError = require("http-errors");
const UserModel = require("../Model/user");

module.exports = async (req, res, next) => {
  try {
      //check if user send token and extract it from //'Berar Token'   
    const token = req.query.Authorization.split(" ")[1];

    const user = await UserModel.verifyToken(token);
    if (!user) next(createError(401));
    req.user = user; // to detect user at any time
    next();
  } catch (err) {
   
    next(createError(401, "unauthorized"));
  }
};
