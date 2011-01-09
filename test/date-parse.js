var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date Parse').addBatch({
    'can instantiate milliseconds': {
        topic: function () { return new Date(123456789) },
        'returns a valid date object': function (date) {
            assert.ok(date);
        },
        'returns a correct value': function (date) {
            assert.equal(date.valueOf(), 123456789);
        }
    },
    
    'can instantiate string': {
        topic: function () { return new Date('Jan 1, 2011 01:01:01 GMT') },
        'returns a valid date object': function (date) {
            assert.ok(date);
        },
        'returns a correct value': function (date) {
            assert.equal(date.valueOf(), 1293843661000);
        }
    },
    
    'can instantiate arguments': {
        topic: function () { return new Date(2011, 1, 1, 1, 1, 1, 0) },
        'returns a valid date object': function (date) {
            assert.ok(date);
        }
    },
    
    'can parse normal date': {
        topic: function () { return Date.parse('Jan 1, 2011 01:01:01 GMT') },
        'returns a correct value': function (milli) {
            assert.equal(milli, 1293843661000);
        }
    },
    
    'can parse ISO-8601': {
        topic: function () { return Date.parse('2011-01-01T01:01:01Z') },
        'returns a correct value': function (milli) {
            assert.equal(milli, 1293843661000);
        }
    }
    
}).run();