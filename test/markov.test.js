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
  it('should should not return junk sentences', function(done) {
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
  it('should should not return junk sentences', function(done) {
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
});
