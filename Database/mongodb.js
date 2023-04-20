const mongoose = require('mongoose');

const db = mongoose.connection;

const databaseOptions = {
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true
};

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/henceforth', databaseOptions);

db
    .on("open", async () => {
        console.log("Database successfully connected.");
    })
    .on("error", () => {
        console.log("Error in connecting database.");
    })
    .on("close", () => {
        console.log("Database disconnected.");
    });



module.exports = mongoose;