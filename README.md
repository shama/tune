# tune
Tune up [baudio](https://github.com/substack/baudio).

## install
Install tune and baudio: `npm install tune baudio`

You also need to install SoX:
[http://sox.sourceforge.net/](http://sox.sourceforge.net/)

## examples

## Just a single note

```js
var b = require('baudio')(), tune = require('tune');

var a5 = tune('A5');

b.push(function(t) { return a5(t); });
b.play();
```

## Hungarian Dance no5

```js
var b = require('baudio')(), tune = require('tune');

var hungarian = tune(String(
  'A5 . . . . D5 . F5 . . . . D5 . C#5 . . . . D5 E5 D5 . . . . ' +
  'Bb5 . . . . C5 . D5 . A5 . . . . G4 F4 E4 . . A5 D4 . . .'
).split(' '), {tempo: 8});

b.push(function(t) { return hungarian(t); });
b.play();
```

## Soundgarden - Black Hole Sun

```js
var b = require('baudio')(), tune = require('tune');

var blackholesun = tune(String(
  'A4 E4 A5 D5 A5 E4 A4 C4 E4 A5 D5 . . . ' +
  'G3 D4 G4 D5 G4 D4 E3 F#3 C#4 F#4 C#5 . . . ' +
  'E3 F3 C4 F4 A#5 F4 C4 F3 E3 D4 E4 B5 . . .'
).split(' '));

b.push(function(t) {
  // black hole sun + some fx
  return blackholesun(t) + Math.sin(2 * Math.PI * t);
});
b.play();
```

## Final Fantasy Arpeggios

```js
var b = require('baudio')(), tune = require('tune');

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
```

# methods

``` js
var tune = require('tune');
```

## var t = tune(notes)
Returns a function: `function(time[, options])` that will return a value based
on `time` between -1 and 1 to formulate a wave. Then you return the value within
your [baudio](http://github.com/substack/baudio) function.

`notes` can be a single note string: `'A#5'` or an array of notes:
`['C4', 'D5', 'E4', 'Gb7']`. Mark notes with sharps `#` and flats `b`. Then
ending number refers to the octave. In a sequence if the octave isn't specified,
it will use the last set octave or `4`. Use `.` for muted notes.

`options` are an object literal `{}`:
* `tempo` [`4`] - how fast to transition through the notes
* `volume` [`1.0`] - volume to play the tune: `0.0 - 1.0`

## Release History
* 0.2.0 - `tune` just returns a function now.
* 0.1.2 - Add mute notes.
* 0.1.1 - Better API interface. Add volume option.
* 0.1.0 - initial release

## License
Copyright (c) 2012 Kyle Robinson Young  
Licensed under the MIT license.
