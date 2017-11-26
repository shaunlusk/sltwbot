var msg = require('../lib/MarkovSentenceGenerator.js');
var assert = require('chai').assert;

describe('MarkovSentenceGenerator', function() {
  describe('#tokensToSentence', function() {
    it('should join tokens into sentence', function(done) {
      var tokens = ['START', 'this', 'is', 'a', 'sentence', '.'];
      var expected = 'This is a sentence.';
      var result = msg.tokensToSentence(tokens);
      assert.equal(result, expected);
      done();
    });
    it('should join tokens into question', function(done) {
      var tokens = ['START', 'this', 'is', 'a', 'sentence', '?'];
      var expected = 'This is a sentence?';
      var result = msg.tokensToSentence(tokens);
      assert.equal(result, expected);
      done();
    });
    it('should join tokens into exclamation', function(done) {
      var tokens = ['START', 'this', 'is', 'a', 'sentence', '!'];
      var expected = 'This is a sentence!';
      var result = msg.tokensToSentence(tokens);
      assert.equal(result, expected);
      done();
    });
  });
  describe('#getSearchToken', function() {
    var tokens = ['START', 'this','is','a'];
    describe('1st order', function() {
      var order = 1;
      it('should produce a search token', function(done) {
        var expected = 'a';
        var result = msg.getSearchToken(tokens, order);
        assert.equal(result, expected);
        done();
      });
    });
    describe('2nd order', function() {
      var order = 2;
      it('should produce a search token', function(done) {
        var expected = 'is a';
        var result = msg.getSearchToken(tokens, order);
        assert.equal(result, expected);
        done();
      });
    });
  });
  describe('#getNextToken', function() {
    var savedFn = msg.getRandom;
    beforeEach(function() {
      msg.getRandom = function() {return 0;};
    });
    afterEach(function() {
      msg.getRandom = savedFn;
    });

    describe('1st order', function() {
      var wordCache = {
        'ORDER':1,
        'START':{'this':1, 'a':1},
        'different':{'sort':1},
        'sort':{'of':1},
        'of':{'sentence':1},
        'this':{'is':1},
        'is':{'a':1},
        'a':{'sentence':1,'different':1},
        'sentence':{'.':2},
        '.':{'END':2}
      };
      it('should return a token', function(done) {
        var searchToken = 'a';
        var expected = 'sentence';

        var result = msg.getNextToken(wordCache, searchToken);

        assert.equal(result, expected);
        done();
      });
    });
    describe('2st order', function() {
      var wordCache = {
        'ORDER':2,
        'START':{'this':1, 'a':1},
        'START a':{'different':1},
        'a different':{'sort':1},
        'different sort':{'of':1},
        'sort of': {'sentence':1},
        'of sentence':{'.':1},
        'START this':{'is':1},
        'this is':{'a':1},
        'is a':{'sentence':1},
        'a sentence':{'.':1},
        'sentence .':{'END':2}
      };
      it('should return a token', function(done) {
        var searchToken = 'START';
        var expected = 'this';

        var result = msg.getNextToken(wordCache, searchToken);

        assert.equal(result, expected);
        done();
      });
      it('should return a token', function(done) {
        var searchToken = 'this is';
        var expected = 'a';

        var result = msg.getNextToken(wordCache, searchToken);

        assert.equal(result, expected);
        done();
      });
    });
  });
  // /generate = function(wordCache, order)
  describe('#generate', function() {
    describe('1st order', function() {
      it('should generate a sentence', function(done) {
        var wordCache = {
          'ORDER':1,
          'START':{'this':1},
          'this':{'is':1},
          'is':{'a':1},
          'a':{'sentence':1},
          'sentence':{'.':1},
          '.':{'END':1}
        };
        var expected = 'This is a sentence.';

        var sentence = msg.generate(wordCache);

        assert.equal(sentence, expected);
        done();
      });
    });
    describe('2nd order', function() {
      it('should generate a sentence (sanity check)', function(done) {
        var wordCache = {
          'ORDER':2,
          'START':{'this':1, 'a':1},
          'START a':{'different':1},
          'a different':{'sort':1},
          'different sort':{'of':1},
          'sort of': {'sentence':1},
          'of sentence':{'.':1},
          'START this':{'is':1},
          'this is':{'a':1},
          'is a':{'sentence':1},
          'a sentence':{'.':1},
          'sentence .':{'END':2}
        };

        var sentence = msg.generate(wordCache);

        assert.isNotNull(sentence);
        done();
      });
    });
  });
});
