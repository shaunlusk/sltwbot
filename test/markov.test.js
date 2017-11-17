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
describe('#wordCachify', function() {
  it('should setup word cache', function(done) {
    var sentence = 'This is a sentence.';
    var wordCache = markov.initializeWordCache();
    var expected = markov.initializeWordCache();
    expected.This = {'is':1};
    expected.is = {'a':1};
    expected.a = {'sentence':1};
    expected.sentence = {'END':{'.':1}};

    markov.wordCachify(wordCache, sentence);

    assert.isObject(wordCache);
    assert.deepEqual(wordCache, expected, 'should setup word cache');
    done();
  });
  it('should setup word cache', function(done) {
    var sentence = 'This is a sentence.';
    var sentence2 = 'This is a slightly different sentence.';
    var wordCache = markov.initializeWordCache();
    var expected = markov.initializeWordCache();
    expected.This = {'is':2};
    expected.is = {'a':2};
    expected.a = {'sentence':1, 'slightly':1};
    expected.sentence = {'END':{'.':1}};
    expected.slightly = {'different':1};
    expected.different =  {'sentence': 1};

    markov.wordCachify(wordCache, sentence);
    markov.wordCachify(wordCache, sentence2);

    assert.isObject(wordCache);
    assert.deepEqual(wordCache, expected, 'should setup word cache');
    done();
  });
});
