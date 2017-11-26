var futils = require('./lib/FileUtils.js');
var msg = require('./lib/MarkovSentenceGenerator.js');

var filePath = process.argv[2];
var order = process.argv[3] || 1;

futils.MarkovWordCacheFromFile(filePath, order, function(err, wordCache) {
  if (err) {
    console.log(err);
    return;
  }

  // console.log(wordCache);
  console.log( msg.generate(wordCache, order) );
});
