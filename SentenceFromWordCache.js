var futils = require('./lib/FileUtils.js');
var msg = require('./lib/MarkovSentenceGenerator.js');

var filePath = process.argv[2];

futils.ReadMarkovWordCacheFromFile(filePath, function(err, wordCache) {
  if (err) {
    console.log(err);
    return;
  }

  // console.log(wordCache);
  console.log( msg.generate(wordCache) );
});
