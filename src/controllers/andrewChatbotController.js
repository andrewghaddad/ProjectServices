const express = require('express');
const router = express.Router();
const llmConnector = require('../middleware/llmConnector');

// Example route for Project 1
router.get('/', (req, res) => {
    const port = process.env.PORT || 3000;
    res.json({ message: `Connected to server with port ${port}` });
});

// Endpoint to handle /query/{query}
router.get('/query/:query', async (req, res) => {
    const query = req.params.query;

    try {
        const response = await llmConnector.genAIResponse(query);
        res.json({ query, response });
    } catch (error) {
        console.error('Error calling llmConnector:', error);
        res.status(500).json({ error: 'Failed to process the query' });
    }
});

module.exports = router;