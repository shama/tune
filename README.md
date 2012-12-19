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
var hungarian = tune('A D5 F D C# D E D'.split(' '));

b.push(hungarian);
b.play();
```

# methods

``` js
var tune = require('tune');
```

## var t = tune(notes)
Return a [baudio](http://github.com/substack/baudio)-compatible
function using [plucky](http://github.com/substack/plucky) given an array of
`notes`.

Some example notes are: `C4`, `Db`, `E6`, `F#3`. The octave defaults to `4` and
will be further set to whatever the last specified octave was.

## Release History
0.1.0 - initial release

## License
Copyright (c) 2012 Kyle Robinson Young  
Licensed under the MIT license.
