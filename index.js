const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middle wares
app.use(cors());
app.use(express.json());

// take-a-trip-dBUser
// hO22RbeTuaZyTILM


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rjzdusk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  await client.connect()
  const serviceCollection = client.db('take-a-trip').collection('services');
  try {
      app.get('/services', async (req, res) => {
          const query = {}
          const cursor = serviceCollection.find(query);
          const services = await cursor.toArray();
          res.send(services);
      });
  }
  finally {

  }
}
run().catch(err => console.error(err));



app.get("/", (req, res) => {
    res.send("Take a Trip Server is Running");
  });
  
  app.listen(port, () => {
    console.log(`Take a trip server running on ${port}`);
  });