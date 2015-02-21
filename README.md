jquery.oncapslock
=================

A simple, lightweight JavaScript event plugin for detecting user input with caps lock on, with support for jQuery.

jQuery is not required, but if you do use it, the plugin required version >= 1.7

Tested on modern browsers and IE8.

Installation
------------
### With bower:
```
bower install oncapslock
```

### Manually:
Download dist/oncapslock.min.js and include it

Usage
-----

### with jQuery
```
// With jQuery usage is rather straightforward
$('#selector').on('capslock', function (e) {

    alert('You are typing with Caps Lock on!');

});
```

### vanilla JS
```
// Without jQuery things get a bit complicated if you intend to support IE8
if (typeof document.addEventListener === 'function') {
	// Modern browsers work as expected
	document.getElementById('example').addEventListener('capslock', yourHandler);
} else {
	// Older IEs don't support custom events, so we'll piggyback on another event
	document.getElementById('example').attachEvent('onpropertychange',
		function(e) {
			// You'll have to check that it was actually fired because of caps
			if (e.eventType === 'capslock') {
				yourHandler(e);
			}
		}
	);
}
```

### alternative approach without jQuery
```
document.getElementById('example').oncapslock = function(e) {
	alert('You are typing with Caps Lock on!');
};
```