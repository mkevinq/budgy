const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();

const auth = require('./auth.js');
const userRoutes = require('./user/routes.js');

const app = express();
const port = 8080;

async function main() {
    const [accessResponse] = await client.accessSecretVersion({name: "projects/budgy-301915/secrets/mongo_link/versions/latest"});
    const mongo_link = accessResponse.payload.data.toString('utf8');

    // Connect to mongoDB
    mongoose.connect(mongo_link, { useNewUrlParser: true })
    .then(response => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

    app.set("mongoose", mongoose);

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(cors());

    app.use(auth);

    app.get('/', (req, res) => {
        res.send("Hello world!");
    });

    app.use("/user", userRoutes);

    app.listen(port);
}

// Clean up on exit
function disconnect() {
    mongoose.connection.close(() => {
        process.exit(0);
    })
}

process.on("SIGINT", disconnect)
process.on("SIGHUP", disconnect)
process.on("SIGTERM", disconnect)

main()
