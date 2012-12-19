var test = require('tap').test;
var tune = require('../lib/tune');

test('parseNote', function(t) {
  t.plan(4);
  t.equal(tune._parseNote('C4').toFixed(2), '261.63');
  t.equal(tune._parseNote('C#4').toFixed(2), '277.19');
  t.equal(tune._parseNote('Cb4').toFixed(2), '246.95');
  t.equal(tune._parseNote('C5').toFixed(2), '523.26');
  t.end();
});
