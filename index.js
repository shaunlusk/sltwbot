var Twit = require('twit');
var config = require('./config.js');

console.log(config);
var T = new Twit(config);

T.post('statuses/update', { status: 'Check' }, function(err,response) {
  if (err) {
    console.log("Err:", err);
  } else {
    console.log("Respone:", response);
  }
});
