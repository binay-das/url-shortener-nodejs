const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const url = require('./models/url');

connectToMongoDB('mongodb://localhost/shorturl')
.then(() => {
    console.log(`MongoDB connected`);
})
.catch((e) => {
    console.log(e);
})

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await url.findOneAndUpdate(
            { shortId }, 
            { $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    res.redirect(entry.redirectUrl);
})

const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
})