var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date Validate').addBatch({
    'can deal with hours': {
        topic: function () { return Date },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateHour(-1), false);
        },
        'false for greater than 23': function (topic) {
            assert.equal(topic.validateHour(24), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateHour(12), true);
        }
    },
    
    'can deal with minutes': {
        topic: function () { return Date },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateMinute(-1), false);
        },
        'false for greater than 59': function (topic) {
            assert.equal(topic.validateMinute(60), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateMinute(30), true);
        }
    },
    
    'can deal with seconds': {
        topic: function () { return Date },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateSecond(-1), false);
        },
        'false for greater than 59': function (topic) {
            assert.equal(topic.validateSecond(60), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateSecond(30), true);
        }
    },
    
    'can deal with milliseconds': {
        topic: function () { return Date },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateMillisecond(-1), false);
        },
        'false for greater than 999': function (topic) {
            assert.equal(topic.validateMillisecond(1000), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateMillisecond(500), true);
        }
    },
    
    'can deal with years': {
        topic: function () { return Date },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateYear(-1), false);
        },
        'false for greater than 9999': function (topic) {
            assert.equal(topic.validateYear(10000), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateYear(5000), true);
        }
    }
}).run();