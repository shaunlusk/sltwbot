

function markovIt(wordCache, str) {
  wordCache = wordCache || initializeWordCache();
  var sentences = sentencize(str);

  sentences.forEach(function(sentence) {
    wordCachify(wordCache, sentence);
  });
  return wordCache;
}

function sentencize(str) {

}

function wordCachify(wordCache, sentence) {

}

function initializeWordCache() {
  var wordCache = {};
  wordCache.START = {};
  wordCache.END = {};
  return wordCache;
}
