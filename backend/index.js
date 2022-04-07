const express = require("express");
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
require('./db/conn.js')
const app = express();
//const cors = require("cors");
const port = process.env.PORT || 5000;
//app.use(cors());
app.use(express.json());
const User = require('./model/userSchema.js');

app.use(require('./router/auth.js'))

const middleware = (req, res, next) => {
    console.log("Middleware");
    next();
}
app.get('/login', (req, res) => {
    res.send('hello from server');
});

app.get('/home', middleware, (req, res) => {
    res.send('hello from server');
});

app.get('/checkout', (req, res) => {
    res.send('hello from server');
});


app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});

// app.post("/register", async(req, res) => {
//     const { username, email, password, phone } = req.body;

//     if (!username || !email || !password || !phone) {
//         return res.status(422).json({ error: "please fill fields properly" })
//     }
//     let user = new User({ username, email, password, phone });
//     let result = await user.save();
//     result = result.toObject();
//     return res.status(201).json({ message: "user registered" });
// });