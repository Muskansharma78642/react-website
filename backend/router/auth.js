const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js')


const User = require('../model/userSchema.js');

// router.get('/login', (req, res) => {
//     res.send('hello from router');
// });

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
        res.status(201).json({ message: 'User Registered' });
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
            res.status(400).json({ error: "User does not exist, Register Yourself" });
        } else {
            token = await userLogin.generateAuthToken();
            //console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
        }

        if (password != userLogin.password) {
            res.status(400).json({ error: "Incorrect Password" });
        } else {
            res.json({ message: "User Logged In Successfully" });
        }

    } catch (err) {
        console.log(err);
    }
})

const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get('/product', authenticate, async(req, res) => {
    res.send(req.rootUser);
})

router.post('/product', async(req, res) => {
    try {
        const { _id, item } = req.body;

        if (!_id || !item) {
            res.status(400).json({ error: "Someting went wrong.." })
        }

        await User.findByIdAndUpdate({
            _id: _id,
        }, {
            $addToSet: {
                cartItems: item,
            },
        });
        res.json({ message: "Products stored" });
    } catch (err) {
        console.log(err)
    }
})

router.post('/checkouts', async(req, res) => {
    try {
        const { _id, item } = req.body;

        if (!_id || !item) {
            res.status(400).json({ error: "Someting went wrong.." })
        }

        await User.findByIdAndUpdate({
            _id: _id,
        }, {
            $addToSet: {
                cartItems: item,
            },
        });
        res.json({ message: "Products stored" });
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