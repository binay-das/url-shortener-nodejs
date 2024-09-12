const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const {connectToMongoDB} = require('./connect');
const url = require('./models/url');
const path = require('path');

connectToMongoDB('mongodb://localhost/shorturl')
.then(() => {
    console.log(`MongoDB connected`);
})
.catch((e) => {
    console.log(e);
})

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: false}));

app.use('/url', urlRoute);
app.use('/', staticRoute);


app.get('/test', async (req, res) => {
    const allUrls = await url.find({});

    return res.render("Home", {
        urls: allUrls
    })
})

app.get('/url/:shortId', async (req, res) => {
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
    if (!entry) {
        return res.status(404).json({ error: "URL not found for the given shortId" });
    }
    res.redirect(entry.redirectUrl);
})

const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
})