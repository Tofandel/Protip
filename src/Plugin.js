'use strict';

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'jquery',
			'./Class'
		], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(
			require('jquery'),
			require('./Class')
		);
	} else {
		factory(
			root.jQuery,
			root.ProtipClass
		);
	}
}(this, function ($, ProtipClass) {

	// Extend the jQuery object with singleton members
	$ = $.extend($, {
		_protipClassInstance: undefined,
		protip: function(settings){
			if (!this._protipClassInstance) {
				this._protipClassInstance = new ProtipClass(settings);
			}
			return this._protipClassInstance;
		}
	});

	// Public element methods
	$.fn.extend({

		/**
		 * Shows the protip on an element.
		 *
		 * @returns {*}
		 */
		protipShow: function() {
			return this.each(function(index, el) {
				$.protipClassInstance.getItemInstance(el).show(true);
			});
		},

		/**
		 * Hides a protip on an element.
		 *
		 * @returns {*}
		 */
		protipHide: function() {
			return this.each(function(index, el) {
				$.protipClassInstance.getItemInstance(el).hide(true);
			});
		},

		/**
		 * Toggles protip on an element.
		 *
		 * @returns {*}
		 */
		protipToggle: function() {
			var instance;

			return this.each(function(index, el) {
				instance = $.protipClassInstance.getItemInstance(el);
				instance = instance.isVisible() ? instance.hide(true) : instance.show(true);
			});
		},

		/**
		 * Hides protips inside another element.
		 *
		 * @returns {*}
		 */
		protipHideInside: function(){
			return this.each(function(index, el) {
				el.find($.protipClassInstance.settings.selector).each(function(index, el){
					$.protipClassInstance.getItemInstance(el).hide(true);
				});
			});
		},

		/**
		 * Shows protips inside another element.
		 *
		 * @returns {*}
		 */
		protipShowInside: function(){
			return this.each(function(index, el) {
				el.find($.protipClassInstance.settings.selector).each(function(index, el){
					$.protipClassInstance.getItemInstance(el).show(true);
				});
			});
		},

		/**
		 * Toggles protips inside another element.
		 *
		 * @returns {*}
		 */
		protipToggleInside: function(){
			var instance;

			return this.each(function(index, el) {
				el.find($.protipClassInstance.settings.selector).each(function(index, el){
					instance = $.protipClassInstance.getItemInstance(el);
					instance = instance.isVisible() ? instance.hide(true) : instance.show(true);
				});
			});
		}
	});
}));