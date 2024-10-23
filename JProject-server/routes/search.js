const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

//handling search queries
router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    console.log("query", query)
    const searchResults = await search(query);
    res.json({ results: searchResults });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'An error occurred during search' });
  }
});


module.exports = router;
