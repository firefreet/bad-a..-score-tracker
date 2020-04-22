const router = require("express").Router();
const mandrillRoutes = require("./mandrill");
const userRoutes = require('./users');

// Mandrill routes MATCHES -> "api/mandrill"
router.use("/mandrill", mandrillRoutes);

// User Routes MATCHES -> 'api/users'
router.use('/users', userRoutes);

module.exports = router;
