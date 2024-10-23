const uri = 'mongodb+srv://darrenkseng:darren@cluster0.gyxisql.mongodb.net/JProject';
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: uri,
    collection: 'browsingSessions'
});

module.exports = session({
    name: "browsingSession",
    secret: 'your-secret-key',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 900000,
        httpOnly: false,
        sameSite: false
    },
    store: store
});