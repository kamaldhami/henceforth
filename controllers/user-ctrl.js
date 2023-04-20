const {
    loginSignUpService,searchService
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

const search = async (req, res) => {

    const response = await searchService(
        req.body
    );
    res.status(201).json({
        message: "success",
        data: response
    });

}

const update = async(req,res) =>{
    
    const response = await serviceMark(
        req.body
    );
    res.status(201).json({
        message: "success",
        data: response
    });

}

module.exports = { loginsignup,search,update };