# sltwbot

Text Bot.
Takes in some text.
Uses Markov chains to generate sentences from the input text.

This is a fun side project.  I may or may not maintain it.
Not extensively tested, it's not bullet-proof.

## Usage
Generate a sentence from some text:

```
node SentenceFromText.js <inputFile> <order>
```
Where `inputFile` is the path to a text file, in utf8 format,
and `order` is the markov chain order.  Defaults to 1, if omitted.

------

Generate a word cache from a text file, suitable for reuse:

```
node TextToWordCache.js <inputFile> <order>
```

Where `inputFile` is the path to a text file, in utf8 format,
and `order` is the markov chain order.  Defaults to 1, if omitted.

Output can be redirected to a file:
```
node TextToWordCache.js testText.txt > testWordCache.json
```
------

Generate a sentence from a word cache:
```
node SentenceFromWordCache.js <inputWordCacheFile>
```
Where `inputWordCacheFile` is the path to a file containing a word cache.
