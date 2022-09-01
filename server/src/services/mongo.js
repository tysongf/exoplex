const mongoose = require('mongoose');

const DB_CLUSTER = 'cluster0';
const DB_NAME = 'nasa';
const DB_USER = 'nasa';
const DB_PASSWORD = '1yxvWqcpXquiurnK';

const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.dtleewu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

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
