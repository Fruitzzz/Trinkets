const jwt = require("jsonwebtoken")
const config = require("config");
const tokenVerify = (req, res, next) => {
    if(req.method === "OPTIONS") {
        return next();
    }
    try{
        const token = req.headers.authorization
        jwt.verify(token, config.get("jwtSecret"))
        next();
    } catch(e) {
        res.status(401).json({msg: "Unauthorized"})
    }
}
module.exports=tokenVerify;