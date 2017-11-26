var fs = require('fs');
var markov = require('./markov.js');

function MarkovWordCacheFromFile(filePath, order, callback) {
  fs.readFile(filePath, 'utf8', function(err, contents) {
    if (err) callback(err);
    var wordCache = markov.markovIt(contents, order);
    callback(null, wordCache);
  });
}

module.exports = {
  MarkovWordCacheFromFile:MarkovWordCacheFromFile
};
