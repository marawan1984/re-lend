'use server'
import { MongoClient } from 'mongodb';
const MONGO_URI = 'mongodb://localhost:27017/myapp';

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('UsersData');
    cachedClient = { client, database };
    return cachedClient;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  if (cachedClient) {
    await cachedClient.client.close();
    console.log("Closed MongoDB connection");
    cachedClient = null;
  }
}
