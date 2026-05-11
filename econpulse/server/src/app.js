require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });

app.use('/api/pulse', require('./routes/pulse'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use('/api/search', require('./routes/search'));

app.use(express.static(require('path').join(__dirname, '../public')));

if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  });
}

module.exports = app;
