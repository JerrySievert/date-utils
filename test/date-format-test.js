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
        topic: function () { return new Date(123456789); },
        'returns the correct abbreviated month': function (date) {
            assert.equal(date.getMonthAbbr(), 'Jan');
        }
    },
    
    'can return month as static method': {
        topic: function () { return new Date(123456789); },
        'returns the correct month': function (date) {
            assert.equal(date.getMonthAbbr(), 'Jan');
        }
    },
    
    'can return common log formatted string': {
        topic: function () { return new Date(Date.UTC(2011, 0, 1, 1, 1, 1, 0)); },
        'returns the correct clf string': function (date) {
            var tz = pad(Math.abs(date.getTimezoneOffset() / 0.6), 4);
            if (date.getTimezoneOffset() > 0) {
                tz = '-' + tz;
            }
            
            date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
            assert.equal(date.toCLFString(), '01/Jan/2011:01:01:01 ' + tz);
        }
    },

    'can return correctly formatted toFormat': {
        topic: function () { var topic = new Date(2011, 0, 1);
                             topic.addHours(13)
                                  .addMinutes(11)
                                  .addSeconds(41);
                             return topic;
                           },
        'returns correctly': function (date) {
            assert.equal(date.toFormat('YYYY'), '2011');
            assert.equal(date.toFormat('YY'), '11');
            assert.equal(date.toFormat('M'), '1');
            assert.equal(date.toFormat('MM'), '01');
            assert.equal(date.toFormat('MMM'), 'Jan');
            assert.equal(date.toFormat('MMMM'), 'January');
            assert.equal(date.toFormat('D'), '1');
            assert.equal(date.toFormat('DD'), '01');
            assert.equal(date.toFormat('DDD'), 'Sat');
            assert.equal(date.toFormat('DDDD'), 'Saturday');
            assert.equal(date.toFormat('H'), '1');
            assert.equal(date.toFormat('HH'), '01');
            assert.equal(date.toFormat('HH24'), '13');
            assert.equal(date.toFormat('MI'), '11');
            assert.equal(date.toFormat('SS'), '41');
        }
    },

    'can return database formatted string': {
        topic: function () { return new Date(Date.UTC(2011, 0, 1, 1, 1, 1, 0)); },
        'returns the correct database string': function (date) {
            assert.equal(date.toDBString(), '2011-01-01 01:01:01');
        }
    },
    
    'when passing an argument to toYMD': {
        topic: function () { return new Date(Date.parse(2011, 0, 1, 1, 1, 1, 0)).toYMD('-'); },
        'the correct string is returned': function (topic) {
            assert.equal(topic, '2011-01-01');
        }
    },

    'when passing an empty argument to toYMD': {
        topic: function () { return new Date(Date.parse(2011, 0, 1, 1, 1, 1, 0)).toYMD(''); },
        'the correct string is returned': function (topic) {
            assert.equal(topic, '20110101');
        }
    },

    'when passing no argument to toYMD': {
        topic: function () { return new Date(Date.parse(2011, 0, 1, 1, 1, 1, 0)).toYMD(); },
        'the correct default is chosen and the string is returned': function (topic) {
            assert.equal(topic, '2011-01-01');
        }
    }

}).export(module);