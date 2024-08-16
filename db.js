const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/reglog'; // Corrected URI

const connectToMongo = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export to app.js for global usage
module.exports = connectToMongo;
