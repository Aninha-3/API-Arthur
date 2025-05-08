const { Router } = require("express");
const userRoutes = require("./userRoutes");

const = Router();

router.use("/user", userRoutes);

module.exports = router;