const cors = require('cors');

const allowedOrigins = [
    'http://localhost:3000',  
    'https://rakuhonyaku.com'  
];

module.exports = cors({
    origin: allowedOrigins,
    credentials: true
});
