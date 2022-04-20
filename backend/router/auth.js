const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');
//const uuid = require("uuid/dist/v4");

const stripe = require("stripe")("sk_test_51Kq9C7SJmXUxWYIpNpUAShpTvNoPjeqfKdowRRb9JoVHRNXvmVK3Dlsr0b5t5AnLSYajZGe2irS8dKY81EvlOvQE00jiMIlHjJ")

const User = require('../model/userSchema.js');

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
            console.log(token)
                // res.cookie("jwtoken", token, {
                //     expires: new Date(Date.now() + 25892000000),
                //     httpOnly: true
                // });
            res.json({ userLogin, token })
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
// router.get('/product', authenticate, async(req, res) => {
//     res.send(req.rootUser);
// })

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
        const { _id, id } = req.body;

        if (!_id || !id) {
            res.status(400).json({ error: "Someting went wrong.." })
        }

        await User.findByIdAndUpdate({
            _id: _id,
        }, {
            $pull: {
                cartItems: { 'productId': id }
            },
        });
    } catch (err) {
        console.log(err)
    }
})

router.post('/googleLogin', async(req, res) => {

    let token

    const { username, email, password, phone } = req.body;

    if (!email) {
        return res.status(422).json({ error: "please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            token = await userExist.generateAuthToken();
            //console.log(token)
            res.json({ userExist, token })
        } else {
            const user = new User({ username, email, password, phone });
            await user.save();
            //console.log(user)

            token = await user.generateAuthToken();
            //console.log(user)
            res.json({ user, token })
        }


    } catch (err) {
        console.log(err);
    }
})

router.get('/logout', (req, res) => {
    console.log('Logout route');
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send({ message: "User Logged Out" });
})

router.post('/payment', (req, res) => {
    const { checkoutItems, token } = req.body;
    console.log("PRODUCTS", checkoutItems);
    console.log("PRICE", checkoutItems.productPrice)

    return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(costumer => {
            stripe.charges.create({
                amount: checkoutItems.productPrice,
                costumer: costumer.id,
                receipt_email: token.email,
                description: checkoutItems.productName,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country
                    },
                },
            })
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
})

module.exports = router;