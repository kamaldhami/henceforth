
const {
  DbAddUser,
  DbFindUser,
  dbCountUser,
  dbUpdateUser
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

const searchService = tryCatchHandler(async (body) => {

  const query = { $text: { $search: body.search } };

  const totalRecords = await dbCountUser({
    query: query
  });
  let records = [];

  if (totalRecords) {
    records = await DbFindUser({
      query: query,
      sort: body.sort,
      project: body.project,
      limit: body.limit,
      skip: body.skip,
      multiple: true
    });
  }

  return {
    records,
    totalRecords
  };

})

const serviceMark = tryCatchHandler(async (body) => {


  const {
    id,
    mark
  } = body;
  const response = await dbUpdateUser({
    query: {
      _id: mongoose.Types.ObjectId(id)
    },
    update: {
      $set: {
        mark
      }
    }
  });
  return response;
})

module.exports = {
  searchService,
  loginSignUpService,
  serviceMark
};
