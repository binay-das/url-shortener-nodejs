const express = require('express');
const router = express.Router();
const { handleGenNewShortUrl, handleGetAnalytics } = require('../controllers/url');


router.post('/', handleGenNewShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

router.get('/home', (req, res) => {
    res.render("Home");
});

router.get('/analytics', (req, res) => {
    
})



module.exports = router;