var futils = require('./lib/FileUtils.js');

var inputPath = process.argv[2];
var order = process.argv[3] || 1;

futils.GenerateMarkovWordCacheFromFile(inputPath, order, function(err, wordCache) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(wordCache));
});
