const express = require('express');
const router = express.Router();
const { sendResetLink, verifyResetLink, resetPassword } = require('../controllers/passwordResetController');

//called when user makes pw reset request
router.post("/", sendResetLink);

//called when user clicks pw reset link in their email
router.get("/:id/:token", verifyResetLink);

router.post("/:id/:token", resetPassword);

module.exports = router;
