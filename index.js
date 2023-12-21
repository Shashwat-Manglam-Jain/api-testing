const express = require('express');
const mongoose = require('mongoose');
const mediaRoutes = require('./routes/media');
const path=require('path')

var cors = require('cors');

const app = express();
app.use(cors());

// Serve the 'public' directory as static content
app.use('/public', express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{res.send("App is running Successfully deployed")})
app.use('/api/v1/media', mediaRoutes);

async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://shashwat:shashwat@cluster0.boloa1n.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to the database');

    app.listen(5000, () => {
      console.log('App is running at: http://localhost:5000');
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

startServer();
