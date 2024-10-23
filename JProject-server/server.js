const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const corsMiddleware = require('./middlewares/corsMiddleware');
const db = require('./config/db');


require("dotenv").config()
console.log("process env", process.env.BASE_URL)
const app = express();
app.use(corsMiddleware);
const server = http.createServer(app);
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");
const passwordRestRoutes = require("./routes/passwordReset");
const searchRoutes = require("./routes/search")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);


app.use('/api/users',userRoutes)  
app.use('/api/auth', authRoutes)
app.use('/api/password-reset', passwordRestRoutes)
app.use('/api/search', searchRoutes)



const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});