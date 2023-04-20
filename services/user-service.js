
const {
  DbAddUser,
  DbFindUser,
  dbCountUser
} = require("../model/User");
const bcrypt = require('bcrypt')
const { generateToken } = require("../config/jwt.config");
const { tryCatchHandler } = require("../helpers/error-handler");

const loginSignUpService = tryCatchHandler(async (body) => {

  let query = { email: body.email };

  let count = await dbCountUser(query)

  if (count) {
    user = await DbFindUser({
      multiple: false,
      query: query,
      project: {
        _id: 1,
        email: 1,
        password: 1
      },
    });

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (passwordMatch) {
      const token = await generateToken(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return {
        token: token,
        record: {
          _id: user._id,
          email: user.email
        },
      };
    } else {
      throw new Error('password incorrect');
    }

  } else {
    body.password = await bcrypt.hash(body.password, 10);
    console.log(body)
    let user = await DbAddUser(body);

    return {
      record: user
    }
  }




})


module.exports = {
  
  loginSignUpService
};
