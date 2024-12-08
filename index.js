const express = require("express");
const cors = require("cors");
require('dotenv').config(); 
const Email = require('./routes/email'); 

const app = express();


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors({
    origin: '*'
}));


app.use(Email);


// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running.`);
});