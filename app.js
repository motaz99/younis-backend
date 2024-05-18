const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./db');

app.use(cors());
const apiRoutes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
  res.send('Hello, World! we will do greate work with this project');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
