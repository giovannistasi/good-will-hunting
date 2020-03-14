'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const router = require('./router.js');

app.use(cors())
app.use(bodyParser.json());
app.use(router);

(async () => {
  try {
    await db.sequelize.sync(); // { force: true }
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the db', error);
  }
})();
