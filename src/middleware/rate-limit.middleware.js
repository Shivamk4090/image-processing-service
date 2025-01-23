const rateLimit = require("express-rate-limit");

// image transform rate limiting
// 15 minutes, limit each IP to 100 requests per windowMs
const transformLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  rateLimit,
  transformLimiter,
};
