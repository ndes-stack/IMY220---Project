//u25069366
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forkful';

let client;
let db;

async function connectDB() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  // Grab the db name from the URI, defaulting to "forkful"
  const dbNameMatch = MONGODB_URI.match(/\/([^/?]+)(\?|$)/);
  const dbName = (dbNameMatch && dbNameMatch[1]) || 'forkful';
  db = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
  return db;
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialised yet. Call connectDB() first.');
  }
  return db;
}

module.exports = { connectDB, getDB };
