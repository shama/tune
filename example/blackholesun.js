var b = require('baudio')();
var Tune = require('../lib/tune.js').Tune;

// soundgarden black hole sun :|
b.push(new Tune(String(
  'A4 E4 A5 D5 A5 E4 A4 C4 E4 A5 D5 . . . ' +
  'G3 D4 G4 D5 G4 D4 E3 F#3 C#4 F#4 C#5 . . . ' +
  'E3 F3 C4 F4 A#5 F4 C4 F3 E3 D4 E4 B5 . . .'
).split(' ')));

b.play();
