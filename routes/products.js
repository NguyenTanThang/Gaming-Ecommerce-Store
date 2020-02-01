const Router = require("express").Router();
const Product = require("../models/product");

Router.get("/", (req, res) => {
    let messages = [];

    Product.find({})
    .sort({created_date: -1})
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

    Product.findById(id)
        .then(product => {
            res.json({
                product
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

Router.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    let messages = [];

    Product.findByIdAndUpdate(id, req.body)
        .then(updatedProduct => {
            messages.push({
                msg: "A product has been updated",
                msg_class: "alert-success"
            })
            res.json({
                messages,
                updatedProduct
            })
        })
        .catch(err => {
            messages.push({
                msg: "Something went wrong when trying to update the data",
                msg_class: "alert-danger"
            })
            res.json({
                messages,
                err
            })
        })
})

Router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    let messages = [];

    Product.findByIdAndDelete(id)
        .then(deletedProduct => {
            messages.push({
                msg: "A product has been deleted",
                msg_class: "alert-success"
            })
            res.json({
                messages,
                deletedProduct
            })
        })
        .catch(err => {
            messages.push({
                msg: "Something went wrong when trying to delete the data",
                msg_class: "alert-danger",
            })
            res.json({
                messages,
                err
            })
        })
})

Router.post("/add", (req, res) => {
    const {
        productName,
        productPrice,
        productImgURL,
        productDescription
    } = req.body;
    let messages = [];

    // Null Validation
    if (!productName || !productPrice || !productImgURL || !productDescription) {
        messages.push({
            msg: "Missing Credentials",
            msg_class: "alert-danger"
        })
    }

    // Check errors
    if (errors.length > 0) {
        return res.json({
            messages
        });
    }

    // Create a new one
    new Product({
            productName,
            productPrice,
            productImgURL,
            productDescription
        }).save()
        .then((createdProduct) => {
            messages.push({
                msg: "Successfully create a new product",
                msg_class: "alert-success"
            })
            res.json({
                messages,
                createdProduct
            })
        })
        .catch((err) => {
            messages.push({
                msg: "Something went wrong when create a new product",
                msg_class: "alert-danger"
            })
            res.json({
                messages,
                err
            })
        })
})

module.exports = Router;