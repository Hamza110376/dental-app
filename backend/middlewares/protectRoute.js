const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.rootUserId === process.env.ROOT_USER_ID) {
      req.rootUserId = decoded.rootUserId;
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protectRoute;
