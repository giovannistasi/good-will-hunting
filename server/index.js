'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./router.js');

app.use(cors())
app.use(bodyParser.json());
app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
