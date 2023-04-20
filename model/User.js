const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String
    },
    password: { type: String }
}, {
    timestamps: true
}, {
    collection: 'Users'
});

let User = null;

try {
    User = mongoose.model('users');
} catch (error) {
    User = mongoose.model('users', userSchema);
}


const DbAddUser = (async (body) => {
    const user = new User(body);
    return await user.save();
});

const DbFindUser = (async (body) => {

    let {
        multiple,
        query,
        project,
        sort,
        limit,
        skip
    } = body;

    multiple = multiple || false;
    query = query || {};
    project = project || {};
    sort = sort || {};
    limit = limit || 0;
    skip = skip || 0;

    let records = [];

    if (multiple) {
        records = await User.find(query, project).sort(sort).skip(skip).limit(limit).lean();
    } else {
        records = await User.findOne(query, project).lean()
    }

    return records;
});

const dbCountUser = (async (body) => {

    let {
        
        query,
    } = body;


    query = query || {};

    let records = [];

    records = await User.count(query).lean();


    return records;

});

module.exports = {
    DbAddUser,
    DbFindUser,
    dbCountUser
};