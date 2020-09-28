const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(cors());
// app.use(express.json());
// app.use(fileupload());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(morgan('dev'));

// Mongoose Connect
mongoose.connect(
  process.env.MONGODG_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB database connection established successfully");
  }
);

// Routing
const practicesRouter = require('./routes/practices');
const teachersRouter = require('./routes/teachers');
const mapsRouter = require('./routes/maps');
const usersRouter = require('./routes/users');

app.use('/practices', practicesRouter);
app.use('/teachers', teachersRouter);
app.use('/maps', mapsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
