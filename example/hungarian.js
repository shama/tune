var b = require('baudio')();
var tune = require('../lib/tune.js');

// hungarian dance no5 melody
var hungarian = tune('A D5 F D C# D E D'.split(' '));

b.push(hungarian);
b.play();

// eventually it would be cool to add sustain "-" and mutes "."
// tune('A - D5 F - D C# - D E D .'.split(' '));
