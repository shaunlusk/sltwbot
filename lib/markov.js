

function markovIt(wordCache, str) {
  wordCache = wordCache || initializeWordCache();
  var sentences = sentencize(str);

  sentences.forEach(function(sentence) {
    wordCachify(wordCache, sentence);
  });
  return wordCache;
}

function sentencize(str) {
  var sentences = [];
  var buffer = [];
  var index = 0;

  while (index < str.length) {
    var ch = str.charAt(index);
    index++;
    if (buffer.length === 0 && /[\.\!\?\s]/.exec(ch))
      continue;
    buffer.push(ch);
    if (/[\.\!\?/]/.exec(ch)) {
      sentences.push(buffer.join(''));
      buffer = [];
    }
  }
  if (buffer.length > 0) sentences.push(buffer.join(''));
  return sentences;
}

function tokenizeSentence(sentence) {
  var tokens = [];
  var buffer = [];
  var index = 0;

  while (index < sentence.length) {
    var ch = sentence.charAt(index);
    index++;
    if (buffer.length === 0 && /[\s]/.exec(ch))
      continue;
    if (/[\s\W/]/.exec(ch)) {
      tokens.push(buffer.join(''));
      if (/\S/.exec(ch)) {
        tokens.push(ch);
      }
      buffer = [];
    } else {
      buffer.push(ch);
    }
  }
  if (buffer.length > 0) tokens.push(buffer.join(''));
  return tokens;
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
  tokenizeSentence : tokenizeSentence,
  wordCachify : wordCachify
};
