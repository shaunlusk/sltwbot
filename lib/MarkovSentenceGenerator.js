function MarkovSentenceGenerator() {}

MarkovSentenceGenerator.prototype.generate = function(wordCache, order) {
  var searchToken = 'START';
  var tokens = [searchToken];
  var nextToken = this.getNextToken(wordCache, searchToken);
  while (nextToken !== 'END') {
    tokens.push(nextToken);
    searchToken = this.getSearchToken(tokens, order);
    nextToken = this.getNextToken(wordCache, searchToken);
  }
  var sentence = this.tokensToSentence(tokens);
  return sentence;
};

MarkovSentenceGenerator.prototype.getNextToken = function(wordCache, searchToken) {
  var probs = wordCache[searchToken];
  var keys = Object.keys(probs);
  var selArray = [];
  keys.forEach(function(key) {
    var value = probs[key];
    for (var i = 0; i < value; i++) {
      selArray.push(key);
    }
  });
  var rnd = Math.floor(this.getRandom() * selArray.length);
  return selArray[rnd];
};

MarkovSentenceGenerator.prototype.getRandom = function() {
  return Math.random();
};

MarkovSentenceGenerator.prototype.getSearchToken = function(tokens, order) {
  if (order > tokens.length) order = tokens.length;
  var subList = tokens.slice(0 - order);
  return subList.join(' ');
};

MarkovSentenceGenerator.prototype.tokensToSentence = function(tokens) {
  tokens = tokens.slice(1);
  var sentence = tokens.join(' ');
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  sentence = sentence.replace(/\s+\./, '.');
  sentence = sentence.replace(/\s+\?/, '?');
  sentence = sentence.replace(/\s+\!/, '!');
  return sentence;
};

module.exports = new MarkovSentenceGenerator();
