var msg = require('./lib/MarkovSentenceGenerator.js');
var futils = require('./lib/FileUtils.js');
var Twit = require('twit');
var twconfig = require('./twconfig.js');
var markovConfig = require('./markovConfig.js');
var T = new Twit(twconfig);
var filePath = markovConfig.wordCachePath;

futils.ReadMarkovWordCacheFromFile(filePath, function(err, wordCache) {
  if (err) {
    console.log(err);
    return;
  }

  var tweet = null;
  try {
    tweet = msg.generate(wordCache);
  } catch (e) {
    console.log(e);
    return;
  }
  if (tweet) {
    T.post('statuses/update', { status: tweet }, function(err,response) {
      if (err) {
        console.log("Err:", err);
      } else {
        console.log('Posted tweet:\n', tweet);
        console.log("\n\nResponse:", response);
      }
    });
  }
});
