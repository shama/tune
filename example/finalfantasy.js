var b = require('baudio')();
var tune = require('../lib/tune.js');

// final fantasy arpeggios
var ff = [];
[
  'C D E G',
  'A B C E',
  'C D E G',
  'A B C E',
  'A C F G',
  'A B D G',
  'Ab C Eb G',
  'A Bb D F',
].forEach(function(chord) {
  chord = chord.split(' ');
  var oct = 3, arp = [];
  for (var i = 0; i < (chord.length - 1) * 4; i++) {
    if (i % 4 === 0) oct++;
    arp.push(chord[i % 4] + oct);
  }
  ff = ff.concat(arp.concat(arp.slice(0, -1).reverse()));
});
ff = tune(ff);

b.push(function(t) { return ff(t); });
b.play();
