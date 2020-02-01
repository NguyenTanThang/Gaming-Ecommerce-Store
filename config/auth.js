const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

const validateJWTToken = (req, res, next) => {
    const token = req.header["jwt-auth-token"];
    let messages = [];

    if (!token) {
        messages.push({
            msg: "You need a token",
            msg_class: "alert-danger"
        })
        return res.json({messages});
    } 

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.setHeader("user_id", decoded);
        next();
    } catch (error) {
        messages.push({
            msg: "Invalid Token",
            msg_class: "alert-danger"
        })
        return res.json({messages});
    }
}

export default validateJWTToken;