const express = require('express');
const router = require('./router/router');
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

