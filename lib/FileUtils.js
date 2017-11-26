var fs = require('fs');
var markov = require('./markov.js');

function GenerateMarkovWordCacheFromFile(filePath, order, callback) {
  fs.readFile(filePath, 'utf8', function(err, contents) {
    if (err) callback(err);
    var wordCache = markov.markovIt(contents, order);
    callback(null, wordCache);
  });
}

function ReadMarkovWordCacheFromFile() {

}

function MarkovWordCacheToFile() {

}

module.exports = {
  'GenerateMarkovWordCacheFromFile':GenerateMarkovWordCacheFromFile,
  'ReadMarkovWordCacheFromFile':ReadMarkovWordCacheFromFile,
  'MarkovWordCacheToFile':MarkovWordCacheToFile
};
