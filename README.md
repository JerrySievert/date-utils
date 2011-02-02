# Date add-ons for Node and beyond

## In a nutshell

- Adds missing functionality to the Date object
- Useable in Node.js
- Useable in the browser

## Installing
    npm install date-utils

## Synopsis

When using from Node:

    require('date-utils');
    
    var date = new Date(Date.parse('2011-01-09T17:57:17.231Z')); // Sun Jan 09 2011 09:57:17 GMT-0800 (PST)
    
    var abbreviated_month = date.getMonthAbbr(); // Jan
    
    var month = date.getMonthName(); // January
    
    var clf = date.toCLString(); // 09/Jan/2011:09:57:017 -0800
    
    var today = Date.today(); // Sun Jan 09 2011 00:00:00 GMT-0800 (PST)

    today.getUTCOffset(); // -0800
    
    Date.validateYear(-1); // false
    
    Date.validateMonth(13); // false
    
    Date.validateHour(12); // true
    
    Date.validateMinute(62); // false
    
    Date.validateSecond(12); // true
    
    Date.validateMillisecond(1000); // false
    
