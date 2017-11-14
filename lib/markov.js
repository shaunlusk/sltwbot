

function markovIt(wordCache, str) {
  wordCache = wordCache || initializeWordCache();
  var sentences = sentencize(str);

  sentences.forEach(function(sentence) {
    wordCachify(wordCache, sentence);
  });
  return wordCache;
}

function sentencize(str) {
  return str;
}

function wordCachify(wordCache, sentence) {
  // for each token
   	// make key : take x prev symbols where x = order n - 1
   	// if entry doesn't exist, create one
   	// if next not in key entry set it to 1
   	// else increment value
}

function initializeWordCache() {
  var wordCache = {};
  wordCache.START = {};
  wordCache.END = {};
  return wordCache;
}

module.exports = {
  markovIt : markovIt,
  sentencize : sentencize,
  wordCachify : wordCachify
};
