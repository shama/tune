/*
 * tune
 * https://github.com/shama/tune
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

// libs
var util = require('util');

// exports
var tune = module.exports = function(notes, opts) {
  tune._options(opts);
  notes = tune._parseNotes(notes);
  return function(time) {
    var n = Math.floor((time * tune.tempo) % notes.length);
    return tune.volume * (Math.sin((2 * Math.PI) * notes[n] * time));
  };
};

// last octave set
tune._octave = 4;

// Return Hz of steps +/- C4
// Hz = C4 * ( 2^1/12 )^steps
tune._hz = function(steps) {
  return 261.63 * Math.pow(Math.pow(2, 1/12), steps || 0);
};

// parses string|array of notes into Hz
tune._parseNotes = function(notes) {
  if (typeof notes === 'string') notes = [notes];
  notes.forEach(function(note, i) {
    notes[i] = util.isArray(note) ? tune._parseNotes(note) : tune._parseNote(note);
  });
  return notes;
};

// parse a note (C4, C#4, Ab5) to Hz
tune._parseNote = function(note) {
  if (typeof note === 'number') return note;
  if (note === '.') return 0;
  var x,
    notes = 'A A# B C C# D D# E F F# G G#'.split(' '),
    a = (x = note.match(/^[a-z]/i)) ? x[0].toUpperCase() : 'C',
    n = (x = note.slice(1).match(/[0-9]/i)) ? x[0] : tune._octave,
    m = (x = note.slice(1).match(/#|b/i)) ? x[0] : '';
  if (m === 'b') {
    a = notes[notes.indexOf(a) - 1];
    m = '';
  }
  tune._octave = Number(n) || tune._octave;
  var steps = (notes.indexOf(a + m) - notes.indexOf('C')) + ((n - 4) * notes.length);
  return tune._hz(steps);
};

// set options on tune
tune._options = function(opts) {
  opts = opts || {};
  // how fast to make changes
  tune.tempo = opts.tempo || 4;
  // volume knob
  tune.volume = opts.volume || 1;
};
