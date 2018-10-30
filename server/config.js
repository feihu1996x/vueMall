const MONGO_HOST = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'vueMall';
const MONGOOSE_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = {
    MONGOOSE_URL,
}