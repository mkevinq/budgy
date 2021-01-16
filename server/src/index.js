const express = require('express');
const cors = require('cors');
const auth = require('./auth.js');

const app = express();
const port = 8080;

app.use(cors());

// app.use(auth);

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.listen(port);
