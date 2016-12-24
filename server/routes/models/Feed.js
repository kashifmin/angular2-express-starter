var mongoose = require('mongoose')

var FeedSchema = mongoose.Schema({
  text: String,
  name: String
});

console.log("hmmmmm:(")

var Feed = mongoose.model('Feed', FeedSchema);
module.exports = Feed;
