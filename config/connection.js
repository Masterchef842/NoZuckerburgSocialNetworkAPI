const { connect, connection } = require('mongoose');


const connectionString =process.env.MONGODB_URL;

connect(connectionString);

module.exports = connection;
