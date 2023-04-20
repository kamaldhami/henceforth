const jwt = require('jsonwebtoken');

module.exports = {

    generateToken: (payload, expiresIn) => {
        return jwt.sign(payload, 'secret', expiresIn, {

        });
    },

    checkToken: async (req, res, next) => {
        try {
            var token = req.headers['authorization'];
            token = token.split(' ')[1];
            if (token) {
                try {
                    const a = await jwt.verify(token, 'secret');
                    req.user = a;
                    next();
                } catch (err) {
                    res.status(403).json({
                        message: 'Invalid Token. Login Again!'
                    });
                }
            }
        } catch (err) {
            res.status(403).json({
                message: 'Invalid Token.'
            });
        }
    },



};
