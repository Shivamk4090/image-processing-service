const router = require("express").Router();
const authRoutes = require("./auth.routes");

// Routes
router.use("/api/auth", authRoutes);

module.exports = router;
