const express = require('express');
const router = express.Router();
const { authenticateUser, logoutUser, verifyUser } = require('../controllers/authController');

router.post('/', authenticateUser);

router.post('/logout', logoutUser);

router.get('/', verifyUser, (req, res) => {
    res.json({ userId: req.session.userID, sid: req.sessionID, isLoggedIn: true });
});

module.exports = router;
