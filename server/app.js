require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(express.json());
// app.use(morgan('dev'));
app.use(cors());
app.get(`/${process.env.LOADERIO}`, (req, res) => {
  res.type('txt').send(`${process.env.LOADERIO}`);
});
app.use('/products', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
