const jwt = require("jsonwebtoken");
const keys = require("../config/auth.config.js");

function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, keys.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = auth;
