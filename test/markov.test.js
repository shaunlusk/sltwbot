var markov = require('../lib/markov.js');
var assert = require('chai').assert;

describe('#sentencize', function() {
  it('should return array of sentences', function(done) {
    var expected = [
      'This is a test!',
      'This is only a test.',
      'Is this a question?',
      'Check.'
    ];
    var sentenceGroup = expected.join(' ');
    var result = markov.sentencize(sentenceGroup);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' sentences');
    assert.deepEqual(result, expected, 'should have returned sentences');
    done();
  });
  it('should return empty array', function(done) {
    var expected = [];
    var sentenceGroup = ' .';
    var result = markov.sentencize(sentenceGroup);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' sentences');
    assert.deepEqual(result, expected, 'should have returned no sentences');
    done();
  });
  it('should return array of sentences, include partials', function(done) {
    var expected = [
      'This is a test!',
      'This is only a test.',
      'Is this a question?',
      'Check'
    ];
    var sentenceGroup = expected.join(' ');
    var result = markov.sentencize(sentenceGroup);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' sentences');
    assert.deepEqual(result, expected, 'should have returned sentences');
    done();
  });
  it('should not return junk sentences', function(done) {
    var expected = [
      'This is a test!',
      'This is only a test.',
      'Is this a question?',
      ' .. '
    ];
    var sentenceGroup = expected.join(' ');
    var result = markov.sentencize(sentenceGroup);
    assert.isArray(result);
    assert.lengthOf(result, expected.length - 1, 'should have returned ' + expected.length + ' sentences');
    for (var i = 0; i < expected.length - 1; i++) {
      assert.equal(result[i], expected[i], 'should have returned sentences');
    }
    done();
  });
  it('should not return junk sentences', function(done) {
    var expected = [
      'This is only a test.',
      ' .. ',
      'Is this a question?'
    ];
    var sentenceGroup = expected.join(' ');
    var result = markov.sentencize(sentenceGroup);
    assert.isArray(result);
    assert.lengthOf(result, expected.length - 1, 'should have returned ' + expected.length + ' sentences');
    assert.equal(result[0], expected[0], 'should have returned sentences');
    assert.equal(result[1], expected[2], 'should have returned sentences');
    done();
  });
});
describe('#tokenizeSentence', function() {
  it('should return array of tokens', function(done) {
    var sentence = 'This is a sentence.';
    var expected = ['This', 'is', 'a', 'sentence', '.'];
    var result = markov.tokenizeSentence(sentence);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' tokens');
    assert.deepEqual(result, expected, 'should have returned tokens');
    done();
  });
  it('should return array of tokens', function(done) {
    var sentence = 'This is a sentence';
    var expected = ['This', 'is', 'a', 'sentence'];
    var result = markov.tokenizeSentence(sentence);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' tokens');
    assert.deepEqual(result, expected, 'should have returned tokens');
    done();
  });
  it('should return array of tokens', function(done) {
    var sentence = 'one';
    var expected = ['one'];
    var result = markov.tokenizeSentence(sentence);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' tokens');
    assert.deepEqual(result, expected, 'should have returned tokens');
    done();
  });
  it('should return array of tokens', function(done) {
    var sentence = 'A question?';
    var expected = ['A', 'question', '?'];
    var result = markov.tokenizeSentence(sentence);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' tokens');
    assert.deepEqual(result, expected, 'should have returned tokens');
    done();
  });
  it('should return array of tokens - with spaces at front of sentence - should never happen?', function(done) {
    var sentence = ' This is a sentence with a space at the beginning!';
    var expected = ['This', 'is', 'a', 'sentence', 'with', 'a', 'space', 'at', 'the', 'beginning', '!'];
    var result = markov.tokenizeSentence(sentence);
    assert.isArray(result);
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' tokens');
    assert.deepEqual(result, expected, 'should have returned tokens');
    done();
  });
});
describe('#getEntry', function() {
  it('retrieves the current entry of the hashmap', function(done) {
    var wordCache = {
      'test' : {'whatever':1}
    };
    var token = 'test';

    var result = markov.getEntry(wordCache, token);

    assert.deepEqual(result, wordCache.test);
    done();
  });
  it('creates an entry in the hash map', function(done) {
    var wordCache = {};
    var token = 'test';

    var result = markov.getEntry(wordCache, token);

    assert.isObject(result);
    assert.isObject(wordCache[token]);
    done();
  });
});
describe('#makeKey', function() {
  it('make first order key from index 0', function(done) {
    var tokens = ['this', 'is'];
    var targetIndex = 0;
    var order = 1;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.equal(result, 'START');
    done();
  });
  it('make first order key from index 1', function(done) {
    var tokens = ['this', 'is'];
    var targetIndex = 1;
    var order = 1;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.equal(result, 'this');
    done();
  });
  it('make first order key from index 2', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 2;
    var order = 1;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.equal(result, 'is');
    done();
  });
  it('make second order key from index 0', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 0;
    var order = 2;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, 'START');
    done();
  });
  it('make second order key from index 1', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 1;
    var order = 2;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, 'START' + ' ' + tokens[0]);
    done();
  });
  it('make second order key from index 2', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 2;
    var order = 2;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, tokens[0] + ' ' + tokens[1]);
    done();
  });
  it('make second order key from index 3', function(done) {
    var tokens = ['this', 'is', 'a', 'sentence'];
    var targetIndex = 3;
    var order = 2;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, tokens[1] + ' ' + tokens[2]);
    done();
  });
  it('make third order key from index 0', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 0;
    var order = 3;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, 'START');
    done();
  });
  it('make third order key from index 1', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 1;
    var order = 3;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, 'START' + ' ' + tokens[0]);
    done();
  });
  it('make third order key from index 2', function(done) {
    var tokens = ['this', 'is', 'a'];
    var targetIndex = 2;
    var order = 3;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, 'START' + ' ' + tokens[0] + ' ' + tokens[1]);
    done();
  });
  it('make third order key from index 3', function(done) {
    var tokens = ['this', 'is', 'a', 'sentence'];
    var targetIndex = 3;
    var order = 3;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, tokens[0] + ' ' + tokens[1] + ' ' + tokens[2]);
    done();
  });
  it('make third order key from index 4', function(done) {
    var tokens = ['this', 'is', 'a', 'sentence', '.'];
    var targetIndex = 4;
    var order = 3;

    var result = markov.makeKey(tokens, targetIndex, order);

    assert.deepEqual(result, tokens[1] + ' ' + tokens[2] + ' ' + tokens[3]);
    done();
  });
});

// describe('#wordCachify', function() {
//   describe('1st Order', function() {
//     it('should setup word cache', function(done) {
//       var sentence = 'This is a sentence.';
//       var wordCache = markov.initializeWordCache();
//       var expected = markov.initializeWordCache();
//       expected.START.this = 1;
//       expected.this = {'is':1};
//       expected.is = {'a':1};
//       expected.a = {'sentence':1};
//       expected.sentence = {'END':{'.':1}};
//
//       markov.wordCachify(wordCache, sentence, 1);
//
//       assert.isObject(wordCache);
//       assert.deepEqual(wordCache, expected, 'should setup word cache');
//       done();
//     });
//     it('should setup word cache', function(done) {
//       var sentence = 'This is a sentence.';
//       var sentence2 = 'This is a slightly different sentence.';
//       var wordCache = markov.initializeWordCache();
//       var expected = markov.initializeWordCache();
//       expected.START.this = 2;
//       expected.this = {'is':2};
//       expected.is = {'a':2};
//       expected.a = {'sentence':1, 'slightly':1};
//       expected.sentence = {'END':{'.':2}};
//       expected.slightly = {'different':1};
//       expected.different =  {'sentence': 1};
//
//       markov.wordCachify(wordCache, sentence, 1);
//       markov.wordCachify(wordCache, sentence2, 1);
//
//       assert.isObject(wordCache);
//       assert.deepEqual(wordCache, expected, 'should setup word cache');
//       done();
//     });
//   });
// });
