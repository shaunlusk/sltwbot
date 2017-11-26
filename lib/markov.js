var debug = false;

function markovIt(str, order, wordCache) {
  order = order || 1;
  wordCache = wordCache || initializeWordCache(order);
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
    // If there's white space at the beginning, skip it.
    if (buffer.length === 0 && /[\s]/.exec(ch))
      continue;
    /* If it is white space or token breaking symbol, add the characters
    * in the current buffer as a token.
    * Then, if it isn't whitespace, add the character as a token.
    */
    if (/[\s\W/]/.exec(ch)) {
      tokens.push(buffer.join(''));
      if (/\S/.exec(ch)) {
        tokens.push(ch);
      }
      buffer = [];
    } else {
      /* Must be a word character or other acceptable symbol.
      * Add to the buffer
      */
      buffer.push(ch);
    }
  }
  if (buffer.length > 0) tokens.push(buffer.join(''));
  return tokens;
}

function wordCachify(wordCache, sentence) {
  var tokens = tokenizeSentence(sentence);

  if (tokens.length < 1) return;

  tokens = tokens.map(function(token) {return token.toLowerCase();});

  populateEntries(wordCache, tokens);
}

function getEntry(wordCache, token) {
  if (!wordCache[token]) wordCache[token] = {};
  return wordCache[token];
}

function populateEntries(wordCache, tokens) {
  // for each inner token
  for (var i = 0; i <= tokens.length; i++) {
    var token = i === tokens.length ? 'END' : tokens[i];

    //  make key : take x prev symbols where x = order
    var key = makeKey(tokens, i, wordCache.ORDER);

    //  if entry doesn't exist, create one
    var entry = getEntry(wordCache, key);

    //  if next not in key entry set it to 1
    //  else increment value
    if (entry[token]) entry[token]++;
    else entry[token] = 1;
  }
}

function makeKey(tokens, targetIndex, order) {
  var idx = targetIndex - order;
  var key = "";
  if (idx < 0) {
    idx = 0;
    key = "START ";
  }
  while (idx < targetIndex) {
    key += tokens[idx] + " ";
    idx++;
  }
  key = key.substr(0, key.length - 1);
  return key;
}

function initializeWordCache(order) {
  var wordCache = {
    'ORDER':order
  };
  return wordCache;
}

module.exports = {
  markovIt : markovIt,
  sentencize : sentencize,
  tokenizeSentence : tokenizeSentence,
  wordCachify : wordCachify,
  initializeWordCache:initializeWordCache,
  getEntry:getEntry,
  makeKey:makeKey,
  populateEntries:populateEntries
};
