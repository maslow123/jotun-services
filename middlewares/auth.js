
require('dotenv').config();
const response = require('../helpers/response');
module.exports = {
    verifyTokenMiddleware: (req, res, next) => {
        const bearerHeader = req.headers['authorization'] || req.query.token;
        if (bearerHeader !== undefined) {
            const jwt = require('jsonwebtoken');
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded) {
                    req.user_id = decoded.data.id;
                    next();
                } else { throw new Error(decoded) }
            } catch (err) {
                console.error(err);
                response.forbidden(res, "Invalid Token");
            }
        } else {
            console.error("no bearer", bearerHeader)
            response.forbidden(res, "No Token Provided")
        }
    }    
}