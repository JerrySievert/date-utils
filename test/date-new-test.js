var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date New').addBatch({
    'can return a new object from today static method': {
        topic: function () { return Date.today(); },
        'returns the correct time': function (date) {
            var compare = new Date().clearTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'clearTime() works': {
        topic: function() { return new Date().clearTime(); },
        'returns the correct value': function (date) {
            var compare = new Date();
            compare.setHours(0);
            compare.setMinutes(0);
            compare.setSeconds(0);
            compare.setMilliseconds(0);
            
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },
    
    'today() works': {
        topic: function() {
            return Date.today();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'yesterday() works': {
        topic: function() {
            return Date.yesterday();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearTime();
            compare.setSeconds(compare.getSeconds() - 86400);
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'tomorrow() works': {
        topic: function() {
            return Date.tomorrow();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearTime();
            compare.setSeconds(compare.getSeconds() + 86400);
            assert.equal(date.valueOf(), compare.valueOf());
        }
    }
    
}).export(module);