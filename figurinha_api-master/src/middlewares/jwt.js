require('dotenv').config();
const jwt = require('jsonwebtoken');
const DisabledJWT = require('../db/collections/disabled_jwt');
const httpRes = require('../statusHttp');

module.exports = {
    createToken: (data, { expiresIn }) => {
        try {
            const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: expiresIn });
            return token;
        } catch (error) {
            console.log(error);
        }
    },
    verifyToken: async (req, res, next) => {
        try {
            let { token } = req.headers;
            if (!token) {
                token = req.query.token;
            }
            if (!token) {
                token = req.body.token;
            }
            if (!token) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            var result = await new Promise((resolve) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        resolve(undefined);
                    } else {
                        resolve(decoded);
                    }
                });
            });
            if (result === undefined) {
                return res.status(httpRes.unauthorized.status).json(httpRes.unauthorized.message);
            } else {
                if (await DisabledJWT.findOne({ token: token })) {
                    return res.status(httpRes.unauthorized.status).json(httpRes.unauthorized.message);
                } else {
                    req.headers.tokenDecoded = result;
                    req.headers.token = token;
                    return next();
                }
            }

        } catch (error) {
            console.log(error);
            return res.status(httpRes.unauthorized.status).json(httpRes.unauthorized.message);
        }
    },
    logout: async (req, res) => {
        try {
            const { token, tokenDecoded } = req.headers;
            if (!token || !tokenDecoded) {
                return res.status(httpRes.badRequest.status).json(httpRes.badRequest.message);
            }
            DisabledJWT.insertOne({ token: token, expire: `${tokenDecoded.exp}000` })
                .then(
                    (_) => {
                        res.status(httpRes.ok.status).json(httpRes.ok.message);
                    })
                .catch((_) => {
                    res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
                })
        } catch (error) {
            console.log(error);
            res.status(httpRes.internalServerError.status).json(httpRes.internalServerError.message);
        }
    }
}