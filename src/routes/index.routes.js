const router = require("express").Router();
const authRoutes = require("./auth.routes");
const imageRoutes = require("./image.routes");
const { authenticate } = require("../middleware/auth.middleware");

// Routes
router.use("/api/auth", authRoutes);
router.use("/api/images", authenticate, imageRoutes);

module.exports = router;
