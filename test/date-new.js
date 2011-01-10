var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date New').addBatch({
    'can return a new object from today object method': {
        topic: function () { return new Date().today() },
        'returns the correct time': function (date) {
            var compare = new Date().clearTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },
    
    'can return a new object from today class method': {
        topic: function () { return Date.today() },
        'returns the correct time': function (date) {
            var compare = new Date().clearTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    }

}).run();