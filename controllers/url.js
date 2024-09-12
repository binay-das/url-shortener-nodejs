const shortid = require('shortid');
const url = require('../models/url');

async function handleGenNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.json({error: "url is required"});
    }

    const shortId = shortid.generate();
    const newUrl = await url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    console.log(newUrl);

    return res.json({
        id: shortId
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    await url.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory
    })
}

module.exports = { handleGenNewShortUrl, handleGetAnalytics};