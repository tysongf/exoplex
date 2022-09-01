const mongoose = require('mongoose');

const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_CLUSTER}.dtleewu.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
   console.log("MongoDB Connection Open!");
});

mongoose.connection.on('error', (error) => {
   console.error(error);
});

async function mongoConnect() {
   await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
   await mongoose.connection.close();
}

module.exports = {
   mongoConnect,
   mongoDisconnect
}
