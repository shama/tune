/*
 * tune
 * https://github.com/shama/tune
 *
 * Copyright (c) 2014 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

// libs
var util = require('util');

// class
var Tune = function(notes) {
  var _this = this;

  // last octave set
  this._octave = 4;

  notes = this._parseNotes(notes);
  return function(time, opts) {
    opts = _this._options(opts);
    var n = Math.floor((time * opts.tempo) % notes.length);
    return opts.volume * (Math.sin((2 * Math.PI) * notes[n] * time));
  };
};

// exports
var tune = module.exports = function(notes) {
  return new Tune(notes);
};

// expose class
tune.Tune = Tune;

// Return Hz of steps +/- C4
// Hz = C4 * ( 2^1/12 )^steps
Tune.prototype._hz = function(steps) {
  return 261.63 * Math.pow(Math.pow(2, 1/12), steps || 0);
};

// parses string|array of notes into Hz
Tune.prototype._parseNotes = function(notes) {
  var _this = this;
  if (typeof notes === 'string') notes = [notes];
  notes.forEach(function(note, i) {
    notes[i] = util.isArray(note) ? _this._parseNotes(note) : _this._parseNote(note);
  });
  return notes;
};

// parse a note (C4, C#4, Ab5) to Hz
Tune.prototype._parseNote = function(note) {
  if (typeof note === 'number') return note;
  if (note === '.') return 0;
  var x,
    notes = 'A A# B C C# D D# E F F# G G#'.split(' '),
    a = (x = note.match(/^[a-z]/i)) ? x[0].toUpperCase() : 'C',
    n = (x = note.slice(1).match(/[0-9]/i)) ? x[0] : this._octave,
    m = (x = note.slice(1).match(/#|b/i)) ? x[0] : '';
  if (m === 'b') {
    a = notes[notes.indexOf(a) - 1];
    m = '';
  }
  this._octave = Number(n) || this._octave;
  var steps = (notes.indexOf(a + m) - notes.indexOf('C')) + ((n - 4) * notes.length);
  return this._hz(steps);
};

// default options
Tune.prototype._options = function(opts) {
  opts = opts || {};
  // how fast to make changes
  opts.tempo = opts.tempo || 4;
  // volume knob
  opts.volume = opts.volume || 1;
  return opts;
};
