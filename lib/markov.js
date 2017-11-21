

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

function wordCachify(wordCache, sentence, order) {
  var tokens = tokenizeSentence(sentence);

  if (tokens.length < 1) return;

  tokens = tokens.map(function(token) {return token.toLowerCase();});

  populateStartEntry(wordCache, tokens[0]);

  populateEntries(wordCache, tokens, order);

  populateEndEntry(wordCache, tokens[tokens.length - 1]);
}

function getEntry(wordCache, token) {
  if (!wordCache[token]) wordCache[token] = {};
  return wordCache[token];
}

function populateStartEntry(wordCache, token) {
  populateSpecialEntry(wordCache, 'START', token);
}

function populateEndEntry(wordCache, token) {
  populateSpecialEntry(wordCache, 'END', token);
}
function populateSpecialEntry(wordCache, key, token) {
  var entry = getEntry(wordCache, key);
  if (entry[token]) entry[token]++;
  else entry[token] = 1;
}

function populateEntries(wordCache, tokens, order) {

  // for each inner token
  for (var i = 1; i < tokens.length - 1; i++) {
    var token = tokens[i];

    //  make key : take x prev symbols where x = order
    var key = makeKey(tokens, i, order);

    //  if entry doesn't exist, create one
    var entry = getEntry(wordCache, key);

    //  if next not in key entry set it to 1
    //  else increment value
    if (entry[token]) entry[token]++
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
  wordCachify : wordCachify,
  initializeWordCache:initializeWordCache,
  getEntry:getEntry,
  makeKey:makeKey
};
