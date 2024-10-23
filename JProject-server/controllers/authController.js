const { User } = require('../models/userdb');
const Joi = require('joi');
const bcrypt = require('bcrypt');

//authenticating user login
const authenticateUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });
        // send back user id, session id, login status
        req.session.userID = user._id;
        res.json({ userID: user._id, sid: req.sessionID, isLoggedIn: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


const logoutUser = async (req, res) => {
    req.session.destroy((error) => {
        if (error) throw error;
        res.clearCookie('browsingSession').send({ isLoggedIn: false });
    });
};

// Middleware to verify user's session
const verifyUser = (req, res, next) => {
    if (req.session.userID) return next();
    return res.json({ isLoggedIn: false });
};

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { authenticateUser, logoutUser, verifyUser };
