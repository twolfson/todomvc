/*global define*/
'use strict';
define(['Sauron', 'CrudModel'], function (Sauron, crudModel) {
	var params = {
		'name': 'state',
		'mixin': ['memory'],
		'load': function () {
			// TODO: Read from URLSON if we care to add this
			// Return our state
			return this.memory.get('state') || {};
		},
		'save': function (state) {
			// TODO: Save to URLSON if we care to add this
			return this.memory.set('state', state);
		},
		'retrieve': function (cb) {
			var state = this.load();
			cb(null, state);
		},
		'update': function (changes, cb) {
			// Load in the state and copy changes
			var state = this.load(),
					keys = Object.getOwnPropertyNames(changes);
			keys.forEach(function (key) {
				state[key] = changes[key];
			});

			// Save and  fire an update event
			this.save(state);
			Sauron.model('state').updateEvent(state);

			// If there is a callback, use it
			if (cb) { cb(null); }
		}
	};
	return crudModel(params);
});