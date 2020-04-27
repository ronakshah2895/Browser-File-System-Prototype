const mongoose = require('mongoose');

const { Schema } = mongoose;
const { MONGO_CONN } = process.env;

mongoose.connect(MONGO_CONN, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const docSchema = require('./document')(Schema);

const docModel = mongoose.model('Doc', docSchema);

module.exports = { docModel };
