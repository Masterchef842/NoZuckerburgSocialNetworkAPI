const { connect, connection } = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://willlord204:Usmell%2313@classactivities.t31oh8d.mongodb.net/socialNetworkDB';

connect(connectionString);

module.exports = connection;
