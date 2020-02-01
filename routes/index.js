const Router = require("express").Router();
const Orders = require("../models/orders");

Router.post("/checkout", async (req, res) => {
    const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    console.log(req.body);

    try {
        
        let charge = await stripe.charges.create({
          amount: parseInt(Math.round(req.body.totalPrice)) * 1,
          currency: "usd",
          description: "An example charge",
          source: req.body.token
        });

        console.log(charge);
        
        const createdOrder = await new Orders({
            user_id: req.body.userID,
            items: req.body.cartItems,
            total: req.body.totalPrice,
            payment_id: charge.id
        }).save();

        console.log(createdOrder);
        res.json({status: charge.status});
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
})

module.exports = Router;