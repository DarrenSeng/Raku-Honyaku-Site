const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studylistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    words: { type: [String], default: [] }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    studylists: { 
        type: [studylistSchema], 
        default: [{ title: 'Favorites', words: [] }]
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = { User, validate };
