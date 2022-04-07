const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const User = require('../model/userSchema.js')

router.get('/login', (req, res) => {
    res.send('hello from router');
});

router.post('/register', async(req, res) => {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
        return res.status(422).json({ error: "please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        }

        const user = new User({ username, email, phone, password });

        //hashing password 

        await user.save();
        res.status(201).json({ message: 'User Registered' })
        console.log(user)
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async(req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const userLogin = await User.findOne({ email: email });

        if (!userLogin) {
            res.status(400).json({ error: "User does not exist, Register Yourself" })
        } else if (password != userLogin.password) {
            res.status(400).json({ error: "Incorrect Password" })
        } else {
            //res.json({ message: "User Logged In Successfully" });

            token = await userLogin.generateAuthToken();
            //console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router;

// router.post('/register', (req, res) => {

//     const { username, email, phone, password } = req.body;

//     if (!username || !email || !phone || !password) {
//         return res.status(422).json({ error: "please fill all the fields" });
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already Exist" });
//             }

//             const user = new User({ username, email, phone, password });

//             user.save().then(() => {
//                 res.status(201).json({ message: "User Registered" });
//             }).catch((err) => res.status(500).json({ error: `Registration Failed ${err}` }));

//         }).catch(err => { console.log(err); });
// })