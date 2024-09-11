const express = require('express');
const router = express.Router();
const { handleGenNewShortUrl, handleGetAnalytics } = require('../controllers/url');


router.post('/', handleGenNewShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);




module.exports = router;