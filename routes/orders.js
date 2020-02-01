const Router = require("express").Router();
const Orders = require("../models/orders");

Router.get("/", (req, res) => {
    let messages = [];

    Orders.find({})
        .then(products => {
            res.json({
                products
            })
        })
        .catch(err => {
            messages.push({
                msg: "Something went wrong when trying to get the data",
                msg_class: "alert-danger"
            })
            res.json({
                messages,
                err
            })
        })
});

Router.get("/:id", (req, res) => {
    const id = req.params.id;
    let messages = [];

    Orders.findById(id)
        .then(order => {
            res.json({
                order
            })
        })
        .catch(err => {
            messages.push({
                msg: "Something went wrong when trying to get the data",
                msg_class: "alert-danger",
            })
            res.json({
                messages,
                err
            })
        })
});

Router.get("/all/:user_id", (req, res) => {
    const id = req.params.user_id;
    let messages = [];

    Orders.find({user_id: id})
        .then(orders => {
            res.json({
                orders
            })
        })
        .catch(err => {
            messages.push({
                msg: "Something went wrong when trying to get the data",
                msg_class: "alert-danger",
            })
            res.json({
                messages,
                err
            })
        })
});

module.exports = Router;