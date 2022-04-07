const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection Successful with mongoDB`)
}).catch((err) => console.log(`Not able to connect to mongoDB ${err}`))