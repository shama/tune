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
var plucky = require('plucky');

// exports
var tune = module.exports = function(notes) {
  if (arguments.length > 1) notes = Array.prototype.slice.call(arguments, 0);
  var measures = tune._parseNotes(notes);
  // lame repeat, todo: add repeat to last measure instead
  if (tune.repeat) measures.push(function(t, clip) { clip.go(0); });
  return plucky(measures);
};

// time signature, sort of
tune.time = 1/4;

// repeat the tune
tune.repeat = true;

// last octave set
tune.octave = 4;

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
  var x,
    notes = 'A A# B C C# D D# E F F# G G#'.split(' '),
    a = (x = note.match(/^[a-z]/i)) ? x[0].toUpperCase() : 'C',
    n = (x = note.slice(1).match(/[0-9]/i)) ? x[0] : tune.octave,
    m = (x = note.slice(1).match(/#|b/i)) ? x[0] : '';
  if (m === 'b') {
    a = notes[notes.indexOf(a) - 1];
    m = '';
  }
  tune.octave = Number(n) || tune.octave;
  var steps = (notes.indexOf(a + m) - notes.indexOf('C')) + ((n - 4) * notes.length);
  return function(t, clip) {
    if (t > tune.time) clip.end();
    return Math.sin((2 * Math.PI) * tune._hz(steps) * t);
  };
};
