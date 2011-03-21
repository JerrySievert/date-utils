var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

function pad(str, length) {
    str = String(str);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

vows.describe('Date Format').addBatch({
    'can return month abbreviations as static method': {
        topic: function () { return new Date(123456789) },
        'returns the correct abbreviated month': function (date) {
            assert.equal(date.getMonthAbbr(), 'Jan');
        }
    },
    
    'can return month as static method': {
        topic: function () { return new Date(123456789) },
        'returns the correct month': function (date) {
            assert.equal(date.getMonthAbbr(), 'Jan');
        }
    },
    
    'can return common log formatted string': {
        topic: function () { return new Date(Date.UTC(2011, 0, 1, 1, 1, 1, 0)) },
        'returns the correct clf string': function (date) {
            var tz = pad(Math.abs(date.getTimezoneOffset() / 0.6), 4);
            if (date.getTimezoneOffset() > 0) {
                tz = '-' + tz;
            }
            
            date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
            assert.equal(date.toCLFString(), '01/Jan/2011:01:01:01 ' + tz);
        }
    },
    
    'can return database formatted string': {
        topic: function () { return new Date(Date.UTC(2011, 0, 1, 1, 1, 1, 0)) },
        'returns the correct database string': function (date) {
            assert.equal(date.toDBString(), '2011-01-01 01:01:01');
        }
    }
}).run();