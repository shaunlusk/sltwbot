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
    assert.lengthOf(result, expected.length, 'should have returned ' + expected.length + ' sentences');
    assert.equal(result, expected, 'should have returned sentences');
    done();
  });
});
