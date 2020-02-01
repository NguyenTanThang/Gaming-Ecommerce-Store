const Router = require("express").Router();
const User = require("../models/users");
const {encryptPassword, comparePassword} = require("../config/encryption");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");

Router.get("/", (req, res) => {
    User.find()
    .then(users => {
        return res.json(users);
    })
})

Router.get("/:id", (req, res) => {
    const userID = req.params.id;
    User.findById(userID)
    .then(foundUser => {
        return res.json(foundUser);
    })
})

Router.post("/signup", (req, res) => {
    let {username, email, password} = req.body;
    let messages = [];

    // Null Validator
    if (!username || !email || !password){
        messages.push({
            msg: "Missing Credentials",
            msg_class: "alert-danger"
        })
    }

    // Check errors
    if (messages.length > 0){
        return res.json({
            messages
        });
    }

    User.findOne({email})
    .then(existUser => {
        if (existUser){
            messages.push({
                msg: "Email has already been used",
                msg_class: "alert-warning"
            })
            return res.json({
                messages
            })
        }

        password = encryptPassword(password);

        new User({username, email, password})
        .save()
        .then(createdUser => {
            messages.push({
                msg: "Signup Successfully",
                msg_class: "alert-success"
            })
            res.json({
                messages,
                createdUser
            })
        })
    })
    .catch(err => {
        messages.push({
            msg: "Something went wrong when trying to create the user",
            msg_class: "alert-danger"
        })
        console.log(err);
        res.json({
            messages,
            err
        })
    })
})

Router.post("/login", (req, res) => {
    const {email, password} = req.body;
    let messages = [];

    // Null Validator
    if (!email || !password){
        messages.push({
            msg: "Missing Credentials",
            msg_class: "alert-danger"
        })
    }

    // Check errors
    if (messages.length > 0){
        return res.json({
            messages
        });
    }

    User.findOne({email})
    .then(existUser => {
        if (!existUser){
            messages.push({
                msg: "Email or password is wrong",
                msg_class: "alert-warning"
            })
            return res.json({
                messages
            })
        }

        if (comparePassword(password, existUser.password)){
            messages.push({
                msg: "Successfully loggged in",
                msg_class: "alert-success"
            })
            const token = jwt.sign({userID: existUser._id}, JWT_SECRET);
            res.setHeader("jwt-auth-token", token);
            res.json({
                messages,
                userID: existUser._id,
                token
            })
        } else {
            messages.push({
                msg: "Email or password is wrong",
                msg_class: "alert-danger"
            })
            return res.json({
                messages
            })
        }
    })
    .catch(err => {
        messages.push({
            msg: "Something went wrong when trying to create the user",
            msg_class: "alert-danger"
        })
        res.json({
            messages,
            err
        })
    })
})

module.exports = Router;