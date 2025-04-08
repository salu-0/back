const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// ✅ CORS configuration for your deployed frontend
app.use(cors({
  origin: 'https://front-teal-seven.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Optional, include only if needed
  allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(express.json());

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://salumanoj2026:salu@cluster0.negtm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    // Don't exit the process, just log the error
    // This allows the server to start even if DB connection fails
  }
};

connectDB();

// Routes
app.use('/api/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
