const express = require('express');
const router = require('./router/router');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api', router);
app.use('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});

