# tune
Tune up [baudio](https://github.com/substack/baudio).

## install
Install tune and baudio: `npm install tune baudio`

You also need to install SoX:
[http://sox.sourceforge.net/](http://sox.sourceforge.net/)

## example

```js
var b = require('baudio')();
var tune = require('tune');

// hungarian dance no5 melody
var hungarian = tune('A5 A0 A0 D5 F5 A0 A0 D5 C#5 A0 A0 D5 E5 D5 A0 A0'.split(' '));

b.push(hungarian);
b.play();
```

```js
var b = require('baudio')();
var tune = require('tune');

// soundgarden black hole sun :|
var blackhole = tune(String(
  'A4 E4 A5 D5 A5 E4 A4 C4 E4 A5 D5 A0 A0 A0 ' +
  'G3 D4 G4 D5 G4 D4 E3 F#3 C#4 F#4 C#5 A0 A0 A0 ' +
  'E3 F3 C4 F4 A#5 F4 C4 F3 E3 D4 E4 B5 A0 A0 A0'
).split(' '));

b.push(blackhole);
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
will be further set to whatever the last specified octave was.

`options` are:
* `duration` [`1/4`] - duration of note
* `repeat` [`true`] - if the tune should repeat
* `volume` [`1.0`] - volume to play the tune: `0.0 - 1.0`

## Release History
* 0.1.1 - Better API interface. Add volume option.
* 0.1.0 - initial release

## License
Copyright (c) 2012 Kyle Robinson Young  
Licensed under the MIT license.
