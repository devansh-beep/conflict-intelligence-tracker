const express = require('express');
const https = require('https');
const router = express.Router();

const NEWS_API_KEY = '748c2ad683f34bd9bc96496a37d0314f';

router.get('/:country', (req, res) => {
  const country = encodeURIComponent(req.params.country + ' conflict war');
  const url = `https://newsapi.org/v2/everything?q=${country}&sortBy=publishedAt&pageSize=3&language=en&apiKey=${NEWS_API_KEY}`;

  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => { data += chunk; });
    apiRes.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        res.json(parsed);
      } catch (e) {
        res.status(500).json({ articles: [], error: 'Failed to parse news response' });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ articles: [], error: err.message });
  });
});

module.exports = router;