const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const config = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
