const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://tondekawere:GLKtksk12345@cluster0.afzgf.mongodb.net/fuelApp?retryWrites=true&w=majority"; // Your MongoDB URI
let db;

// Default Users for Admin, Client, and Threshold
const defaultUsers = [
  {
    email: 'admin@fuel.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    email: 'client@fuel.com',
    password: 'client123',
    role: 'client',
  },
  {
    email: 'threshold@fuel.com',
    password: 'threshold123',
    role: 'threshold',
  },
];

// Connect to MongoDB
async function connectMongoDB() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("✅ MongoDB Connected");
  db = client.db("fuelApp"); // Specify your database name here

  // Check if users collection exists, if not, insert default users
  const usersCollection = db.collection('users');
  const userCount = await usersCollection.countDocuments();
  
  if (userCount === 0) {
    await usersCollection.insertMany(defaultUsers);
    console.log("✅ Default users inserted.");
  }
}

connectMongoDB();

// Sign-in Endpoint
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add Client Endpoint
app.post('/clients', async (req, res) => {
  const newClient = req.body;

  try {
    const result = await db.collection("clients").insertOne(newClient);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ message: "Error adding client" });
  }
});

// Fetch Clients Endpoint
app.get('/clients', async (req, res) => {
  try {
    const clients = await db.collection("clients").find().toArray();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients" });
  }
});

// Start Server
server.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
