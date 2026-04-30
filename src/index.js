const express = require('express');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const project1Controller = require('./controllers/andrewChatbotController');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/chatbot', project1Controller);

// Mount the router at the base path
app.use('/', router); // Mount all routes relative to the Netlify function's base path

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports.handler = serverless(app);