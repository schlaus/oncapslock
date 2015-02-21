###
# oncapslock event plugin v1.0.0
# https://github.com/schlaus/oncapslock
# 
# A simple, lightweight JavaScript plugin for detecting
# user input with caps lock on, with jQuery support.
# 
# Copyright 2015 Klaus Karkia
# Released under the MIT license
# http://schlaus.mit-license.org/
# 
###

document.onkeypress = (e) ->
	e = e or window.event

	charCode = e.which or e.keyCode
	char = String.fromCharCode charCode

	shiftOn = false
	if e.shiftKey
		shiftOn = e.shiftKey
	else if e.modifiers
		shiftOn = !!(e.modifiers & 4)

	if (shiftOn and
			 char.toUpperCase() isnt char and char.toLowerCase() is char) or
		(not shiftOn and
			char.toLowerCase() isnt char and char.toUpperCase() is char)

				target = e.srcElement or e.target

				if jQuery?
					jQuery(target).trigger "capslock"
					return

				if typeof Event is "function"
					dispatch = true
					event = new Event "capslock"
				else
					if document.createEvent
						dispatch = true
						event = document.createEvent "HTMLEvents"
						event.initEvent "capslock", true, true
					else
						dispatch = false
						event = document.createEventObject()
						event.eventType = "capslock"

				event.eventName = "capslock"

				if typeof target.oncapslock is "function"
					target.oncapslock event

				if dispatch
					target.dispatchEvent event
				else
					target.fireEvent "onpropertychange", event

				return