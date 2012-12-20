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

// class
var Tune = function(notes, opts) {
  opts = opts || {};

  // duration of note
  this.duration = opts.duration || 1/4;

  // repeat the tune
  this.repeat = opts.repeat || true;

  // volume knob
  this.volume = opts.volume || 1;

  // last octave set
  this._octave = 4;

  // parse notes
  var measures = this._parseNotes(notes);

  // lame repeat, todo: add repeat to last measure instead
  if (this.repeat) measures.push(function(t, clip) { clip.go(0); });

  return plucky(measures);
};

// exports
var tune = module.exports = function(notes, opts) {
  return new Tune(notes, opts);
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
  var x,
    _this = this,
    notes = 'A A# B C C# D D# E F F# G G#'.split(' '),
    a = (x = note.match(/^[a-z]/i)) ? x[0].toUpperCase() : 'C',
    n = (x = note.slice(1).match(/[0-9]/i)) ? x[0] : _this._octave,
    m = (x = note.slice(1).match(/#|b/i)) ? x[0] : '';
  if (m === 'b') {
    a = notes[notes.indexOf(a) - 1];
    m = '';
  }
  _this._octave = Number(n) || _this._octave;
  var steps = (notes.indexOf(a + m) - notes.indexOf('C')) + ((n - 4) * notes.length);
  return function(t, clip) {
    if (t > _this.duration) clip.end();
    if (note === '.') return 0;
    return _this.volume * (Math.sin((2 * Math.PI) * _this._hz(steps) * t));
  };
};
