/*
 * oncapslock event plugin v1.0.0
 * https://github.com/schlaus/oncapslock
 * 
 * A simple, lightweight JavaScript plugin for detecting
 * user input with caps lock on, with support for jQuery.
 * 
 * Copyright 2015 Klaus Karkia
 * Released under the MIT license
 * http://schlaus.mit-license.org/
 *
 */
document.onkeypress = function(e) {
  var char, charCode, dispatch, event, shiftOn, target;
  e = e || window.event;
  charCode = e.which || e.keyCode;
  char = String.fromCharCode(charCode);
  shiftOn = false;
  if (e.shiftKey) {
    shiftOn = e.shiftKey;
  } else if (e.modifiers) {
    shiftOn = !!(e.modifiers & 4);
  }
  if ((shiftOn && char.toUpperCase() !== char && char.toLowerCase() === char) || (!shiftOn && char.toLowerCase() !== char && char.toUpperCase() === char)) {
    target = e.srcElement || e.target;
    if (typeof jQuery !== "undefined" && jQuery !== null) {
      jQuery(target).trigger("capslock");
      return;
    }
    if (typeof Event === "function") {
      dispatch = true;
      event = new Event("capslock");
    } else {
      if (document.createEvent) {
        dispatch = true;
        event = document.createEvent("HTMLEvents");
        event.initEvent("capslock", true, true);
      } else {
        dispatch = false;
        event = document.createEventObject();
        event.eventType = "capslock";
      }
    }
    event.eventName = "capslock";
    if (typeof target.oncapslock === "function") {
      target.oncapslock(event);
    }
    if (dispatch) {
      target.dispatchEvent(event);
    } else {
      target.fireEvent("onpropertychange", event);
    }
  }
};