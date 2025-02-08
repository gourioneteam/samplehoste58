const mongoose = require('mongoose');
require('dotenv').config()


const connectDB = async () => {
  try {
    const connection=await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    console.log('Database Name:', connection.connection.name); // Retrieve the database name

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
