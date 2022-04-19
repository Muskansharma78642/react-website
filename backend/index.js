const express = require("express");
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
require('./db/conn.js')

const app = express();

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
const User = require('./model/userSchema.js');

app.use(require('./router/auth.js'))

app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});