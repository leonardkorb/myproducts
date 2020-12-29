require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

mongoose.connect(process.env.MONGO_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

mongoose.Promise = global.Promise;

requireDir('./models');

app.use('/api', require('./routes'));

app.listen(process.env.PORT || 3001);