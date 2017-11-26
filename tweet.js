var msg = require('./lib/MarkovSentenceGenerator.js');
var futils = require('./lib/FileUtils.js');
var Twit = require('twit');
var twconfig = require('./twconfig.js');
var markovConfig = require('./markovConfig.js');
var T = new Twit(twconfig);
var filePath = markovConfig.wordCachePath;
var tooLongReattempts = markovConfig.tooLongReattempts;
var maxTweetLength = markovConfig.maxTweetLength;

futils.ReadMarkovWordCacheFromFile(filePath, function(err, wordCache) {
  if (err) {
    console.log(err);
    return;
  }

  var tweet = null;
  try {
    var attempt = 0;
    tweet = msg.generate(wordCache);
    while (tweet.length > maxTweetLength && attempt < tooLongReattempts) {
      attempt++;
      tweet = msg.generate(wordCache);
    }
  } catch (e) {
    console.log(e);
    return;
  }
  if (tweet && tweet.length <= maxTweetLength) {
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
