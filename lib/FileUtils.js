var fs = require('fs');
var markov = require('./markov.js');

function GenerateMarkovWordCacheFromFile(filePath, order, callback) {
  fs.readFile(filePath, 'utf8', function(err, contents) {
    if (err) callback(err);
    var wordCache = markov.markovIt(contents, order);
    callback(null, wordCache);
  });
}

function ReadMarkovWordCacheFromFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, contents) {
    if (err) callback(err);
    try {
      var wordCache = JSON.parse(contents);
      callback(null, wordCache);
    } catch(e) {
      callback(e);
    }
  });
}

function MarkovWordCacheToFile(wordCache, filePath, callback) {
  fs.writeFile(filePath, JSON.stringify(wordCache), function(err) {
    if (err) callback(error);
    callback();
  });
}

module.exports = {
  'GenerateMarkovWordCacheFromFile':GenerateMarkovWordCacheFromFile,
  'ReadMarkovWordCacheFromFile':ReadMarkovWordCacheFromFile,
  'MarkovWordCacheToFile':MarkovWordCacheToFile
};
