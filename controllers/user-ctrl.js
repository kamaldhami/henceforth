const {
    loginSignUpService
} = require('../services/user-service');





const loginsignup = async (req, res) => {

    const response = await loginSignUpService(
        req.body
    );
    res.status(201).json({
        message: "success",
        data: response
    });

}

module.exports = { loginsignup };