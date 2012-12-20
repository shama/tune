# tune
Tune up [baudio](https://github.com/substack/baudio).

## install
Install tune and baudio: `npm install tune baudio`

You also need to install SoX:
[http://sox.sourceforge.net/](http://sox.sourceforge.net/)

## examples

## Hungarian Dance no5

```js
var b = require('baudio')();
var tune = require('tune');

var hungarian = tune('A5 . . . . D5 . F5 . . . . D5 . C#5 . . . . D5 E5 D5 . . . .'.split(' '), {
  duration: 1/8
});

b.push(hungarian);
b.play();
```

## Soundgarden - Black Hole Sun

```js
var b = require('baudio')();
var Tune = require('tune').Tune;

// soundgarden black hole sun :|
b.push(new Tune(String(
  'A4 E4 A5 D5 A5 E4 A4 C4 E4 A5 D5 . . . ' +
  'G3 D4 G4 D5 G4 D4 E3 F#3 C#4 F#4 C#5 . . . ' +
  'E3 F3 C4 F4 A#5 F4 C4 F3 E3 D4 E4 B5 . . .'
).split(' ')));

b.play();
```

## Final Fantasy Arpeggios

```js
var b = require('baudio')();
var tune = require('tune');

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

b.push(tune(ff));
b.play();
```

# methods

``` js
var tune = require('tune');
```

## var t = tune(notes[, options])
Return a [baudio](http://github.com/substack/baudio)-compatible
function using [plucky](http://github.com/substack/plucky) given an array of
`notes`.

Some example notes are: `C4`, `Db`, `E6`, `F#3`. The octave defaults to `4` and
will be further set to whatever the last specified octave was. Mute notes are `.`.

`options` are:
* `duration` [`1/4`] - duration of note
* `repeat` [`true`] - if the tune should repeat
* `volume` [`1.0`] - volume to play the tune: `0.0 - 1.0`

## Release History
* 0.1.2 - Add mute notes.
* 0.1.1 - Better API interface. Add volume option.
* 0.1.0 - initial release

## License
Copyright (c) 2012 Kyle Robinson Young  
Licensed under the MIT license.
