var b = require('baudio')();
var tune = require('../lib/tune.js');

// soundgarden black hole sun :|
var intro = tune(String(
  'A4 E4 A5 D5 A5 E4 A4 C4 E4 A5 D5 A0 A0 A0 ' +
  'G3 D4 G4 D5 G4 D4 E3 F#3 C#4 F#4 C#5 A0 A0 A0 ' +
  'E3 F3 C4 F4 A#5 F4 C4 F3 E3 D4 E4 B5 A0 A0 A0'
).split(' '));

b.push(intro);
b.play();
