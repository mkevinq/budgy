const express = require('express');
const mongoose = require('mongoose');
const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();
const router = express.Router();

const User = require('../models/userModel');
const Purchase = require('../models/purchaseModel');
const Item = require('../models/itemModel');

router.get("/purchases", (req, res) => {
    Purchase.find({ user: req.user.uid })
    .then(result => res.status(200).json({ data: result }));
})

router.get("/purchase/:purchaseId", (req, res) => {
    Purchase.findById(req.params.purchaseId)
    .then(result => res.status(200).json({ data: result }));
})

router.get("/items/:purchaseId", (req, res) => {
    Item.find({ purchase: req.params.purchaseId })
    .then(result => res.status(200).json({ data: result }));
})

router.get("/item/:itemId", (req, res) => {
    Item.findById(req.params.itemId)
    .then(result => res.status(200).json({ data: result }));
})

router.post("/upload", (req, res) => {
    const [result] = client.textDetection(Buffer.from(req.body.imgb64, 'base64'));
})

router.post("/createPurchase", (req, res) => {
    let purchase = {
        user: req.user.uid,
        date: req.body.date,
        items: []
    }
    let purchaseId = mongoose.Types.ObjectId();
    let items = [];

    if (req.body.image) purchase.image = req.body.image;

    for (i = 0; i < req.body.items.length; i++) {
        let itemId = mongoose.Types.ObjectId();
        purchase.items.push(itemId);
        let item = {
            _id: itemId,
            user: req.user.uid,
            purchase: purchaseId,
            name: req.body.items[i].name,
            cost: req.body.items[i].cost,
            category: req.body.items[i].category
        }
        items.push(item)
        Item.create(item)
        .then(result => {
            console.log("New item:\n", result);
        });
    }

    Purchase.create(purchase)
    .then(result => {
        console.log("New purchase:\n", result);
        res.status(200).json({ data: { purchase: result, items: items } });
    })
})

module.exports = router;
