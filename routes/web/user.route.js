var express = require('express')
const userRouter = express.Router();

const {loginsignup } = require('../../controllers/user-ctrl');
const { asyncHandler } = require('../../helpers/error-handler');
userRouter.get('/',(req,res) =>{
    res.json({message:'welcome'})
})



userRouter.post('/loginsignup',asyncHandler(loginsignup))

module.exports = userRouter;