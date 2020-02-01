const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("we are connected")
}).catch(err => console.log(err));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Import Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));
app.use("/products", require("./routes/products"));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, "localhost", () => {
    console.log("Server is running on port " + PORT);
})