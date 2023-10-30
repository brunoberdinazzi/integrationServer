const mongoose = require('mongoose');

const xmlDataSchema = new mongoose.Schema({
  data: String, 
});

module.exports = mongoose.model('XMLData', xmlDataSchema);
