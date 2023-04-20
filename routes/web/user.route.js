var express = require('express')
const userRouter = express.Router();

const { loginsignup, search, update } = require('../../controllers/user-ctrl');
const { asyncHandler } = require('../../helpers/error-handler');
const { checkToken } = require('../../config/jwt.config');
userRouter.get('/', (req, res) => {
    res.json({ message: 'welcome' })
})



userRouter.post('/loginsignup', asyncHandler(loginsignup))
userRouter.post('/mark', asyncHandler(checkToken), asyncHandler(update))
userRouter.post('/searchApi', asyncHandler(checkToken), search)

module.exports = userRouter;