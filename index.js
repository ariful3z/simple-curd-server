const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI - Make sure the credentials are correct
// const uri = "mongodb+srv://arif:@riF123456@cluster0.ht3jo.mongodb.net/myDatabase?retryWrites=true&w=majority";

// const uri = "mongodb+srv://arif:%40riF123456@cluster0.ht3jo.mongodb.net/myDatabase?retryWrites=true&w=majority";


// const uri = "mongodb+srv://arafat:9z5JDXk2LoGVcP1c@cluster0.ht3jo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var uri = "mongodb://arafat:9z5JDXk2LoGVcP1c@cluster0-shard-00-00.ht3jo.mongodb.net:27017,cluster0-shard-00-01.ht3jo.mongodb.net:27017,cluster0-shard-00-02.ht3jo.mongodb.net:27017/?ssl=true&replicaSet=atlas-302waq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the MongoDB cluster
    // const database = client.db("usersDb");
    // const userCollection = database.collection("database");
    const usersCollection = client.db('usersDb').collection('users')

    app.post('/users', async (req, res) => {
        const user = req.body;
        console.log('new user', user);
        const result = await usersCollection.insertOne(user);
        res.send(result);
    });

    // Get a reference to the collection where users will be stored


    // POST route to add a user
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('New user:', user);

      try {
        // Insert the user into the 'users' collection
        const result = await usersCollection.insertOne(user);
        res.status(201).json({ message: 'User added nodesuccessfully', result });
      } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error adding user', error });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

// Home route
app.get('/', (req, res) => {
  res.send('SIMPLE CRUD IS RUNNING');
});

// Start the server
app.listen(port, () => {
  console.log(`SIMPLE CRUD is running on port ${port}`);
});
