/*

© 2011 by Jerry Sievert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

(function () {
    // constants
    var monthsAbbr = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    var monthsFull = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var dayNames = {
        'su':         0,
        'sun':        0,
        'sunday':     0,
        'mo':         1,
        'mon':        1,
        'monday':     1,
        'tu':         2,
        'tue':        2,
        'tuesday':    2,
        'we':         3,
        'wed':        3,
        'wednesday':  3,
        'th':         4,
        'thu':        4,
        'thursday':   4,
        'fr':         5,
        'fri':        5,
        'friday':     5,
        'sa':         6,
        'sat':        6,
        'saturday':   6
    };

    var monthNames = {
        'jan':        0,
        'january':    0,
        'feb':        1,
        'february':   1,
        'mar':        2,
        'march':      2,
        'apr':        3,
        'april':      3,
        'may':        4,
        'jun':        5,
        'june':       5,
        'jul':        6,
        'july':       6,
        'aug':        7,
        'august':     7,
        'sep':        8,
        'september':  8,
        'oct':        9,
        'october':    9,
        'nov':        10,
        'november':   10,
        'dec':        11,
        'december':   11
    };

    var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


    // private helper functions
    /** @ignore */
    function pad(str, length) {
        str = String(str);
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
    

    // static class methods
    var origParse = Date.parse;
    /** @ignore */
    Date.parse = function (date) {
        var timestamp = origParse(date), minutesOffset = 0, match;
        if (isNaN(timestamp) && (match = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date))) {
            if (match[8] !== 'Z') {
                minutesOffset = +match[10] * 60 + (+match[11]);
                
                if (match[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }
            
            timestamp = Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5] + minutesOffset, +match[6], +match[7].substr(0, 3));
        }
        
        return timestamp;
    };


    /**
        Returns new instance of Date object with the date set to today and
        the time set to midnight
        @returns {Date} Today's Date
        @function
     */
    Date.today = function () {
        return new Date().clearTime();
    }

    /**
        Returns new instance of Date object with the date set to tomorrow and
        the time set to midnight
        @returns {Date} Tomorrow's Date
        @function
     */
    Date.tomorrow = function () {
        return Date.today().add({days: 1});
    }

    /**
        Returns new instance of Date object with the date set to yesterday and
        the time set to midnight
        @returns {Date} Yesterday's Date
        @function
     */
    Date.yesterday = function () {
        return Date.today().add({days: -1});
    }

    Date.validateDay = function (day, year, month) {
        var date = new Date(year, month, day);
        return (date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day);
    }
    
    Date.validateYear = function (year) {
        return (year >= 0 && year <= 9999);
    }
    
    Date.validateSecond = function (second) {
        return (second >= 0 && second < 60);
    }
    
    Date.validateMonth = function (month) {
        return (month >= 0 && month < 12);
    }
    
    Date.validateMinute = function (minute) {
        return (minute >= 0 && minute < 60);
    }
    
    Date.validateMillisecond = function (milli) {
        return (milli >= 0 && milli < 1000);
    }
    
    Date.validateHour = function (hour) {
        return (hour >= 0 && hour < 24);
    }
    
    Date.compare = function (date1, date2) {
        if (date1.valueOf() < date2.valueOf()) {
            return -1;
        } else if (date1.valueOf() > date2.valueOf()) {
            return 1;
        }
        return 0;
    }

    Date.equals = function (date1, date2) {
        return date1.valueOf() === date2.valueOf();
    }
    

    Date.getDayNumberFromName = function (name) {
        return dayNames[name.toLowerCase()];
    }
    
    
    Date.getMonthNumberFromName = function (name) {
        return monthNames[name.toLowerCase()];
    }
    
    Date.isLeapYear = function (year) {
        return (new Date(year, 1, 29).getDate() === 29);
    }
    
    Date.getDaysInMonth = function (year, month) {
        if (month === 1) {
            return Date.isLeapYear(year) ? 29 : 28;
        }
        return daysInMonth[month];
    }

    
    if (Date.prototype.getMonthAbbr === undefined) {
        Date.prototype.getMonthAbbr = function () {
            return monthsAbbr[this.getMonth()];
        }
    }

    
    if (Date.prototype.getMonthName === undefined) {
        Date.prototype.getMonthName = function () {
            return monthsFull[this.getMonth()];
        }
    }
    

    if (Date.prototype.getUTCOffset === undefined) {
        Date.prototype.getUTCOffset = function () {
            var tz = pad(Math.abs(this.getTimezoneOffset() / 0.6), 4);
            if (this.getTimezoneOffset() > 0) {
                tz = '-' + tz;
            }
            return tz;
        }
    }
    
    if (Date.prototype.toCLFString === undefined) {
        Date.prototype.toCLFString = function () {
            return pad(this.getDate(), 2) + '/' + this.getMonthAbbr() + '/' +
                   this.getFullYear() + ':' + pad(this.getHours(), 2) + ':' +
                   pad(this.getMinutes(), 2) + ':' + pad(this.getSeconds(), 2) +
                   ' ' + this.getUTCOffset();
        }
    }
    
    if (Date.prototype.toYMD === undefined) {
        Date.prototype.toYMD = function (separator) {
            separator = separator || '-';
            return this.getFullYear() + separator + pad(this.getMonth() + 1, 2) +
                separator + pad(this.getDate(), 2);
        }
    }
    
    if (Date.prototype.toDBString === undefined) {
        Date.prototype.toDBString = function () {
            return this.getUTCFullYear() + '-' +  pad(this.getUTCMonth() + 1, 2) + 
                   '-' + pad(this.getUTCDate(), 2) + ' ' + pad(this.getUTCHours(), 2) + 
                   ':' + pad(this.getUTCMinutes(), 2) + ':' + pad(this.getUTCSeconds(), 2);
        }
    }    
    
    if (Date.prototype.clearTime === undefined) {
        Date.prototype.clearTime = function () {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);
            
            return this;
        }
    }

    if (Date.prototype.add === undefined) {
        Date.prototype.add = function (obj) {
            if (obj.milliseconds !== undefined) {
                this.setMilliseconds(this.getMilliseconds() + obj.milliseconds);
            }
            if (obj.seconds !== undefined) {
                this.setSeconds(this.getSeconds() + obj.seconds);
            }
            if (obj.minutes !== undefined) {
                this.setMinutes(this.getMinutes() + obj.minutes);
            }
            if (obj.hours !== undefined) {
                this.setHours(this.getHours() + obj.hours);
            }
            if (obj.days !== undefined) {
                this.setDate(this.getDate() + obj.days);
            }
            if (obj.months !== undefined) {
                this.setMonth(this.getMonth() + obj.months);
            }
            if (obj.years !== undefined) {
                this.setFullYear(this.getFullYear() + obj.years);
            }
            return this;
        }
    }

    if (Date.prototype.addMilliseconds === undefined) {
        Date.prototype.addMilliseconds = function (milliseconds) {
            return this.add({ milliseconds: milliseconds });
        }
    }

    if (Date.prototype.addSeconds === undefined) {
        Date.prototype.addSeconds = function (seconds) {
            return this.add({ seconds: seconds });
        }
    }

    if (Date.prototype.addMinutes === undefined) {
        Date.prototype.addMinutes = function (minutes) {
            return this.add({ minutes: minutes });
        }
    }

    if (Date.prototype.addHours === undefined) {
        Date.prototype.addHours = function (hours) {
            return this.add({ hours: hours });
        }
    }

    if (Date.prototype.addDays === undefined) {
        Date.prototype.addDays = function (days) {
            return this.add({ days: days });
        }
    }

    if (Date.prototype.addWeeks === undefined) {
        Date.prototype.addWeeks = function (weeks) {
            return this.add({ days: (weeks * 7) });
        }
    }

    if (Date.prototype.addMonths === undefined) {
        Date.prototype.addMonths = function (months) {
            return this.add({ months: months });
        }
    }

    if (Date.prototype.addYears === undefined) {
        Date.prototype.addYears = function (years) {
            return this.add({ years: years });
        }
    }

    if (Date.prototype.setTimeToNow === undefined) {
        Date.prototype.setTimeToNow = function () {
            var n = new Date();
            this.setMilliseconds(n.getMilliseconds());
            this.setSeconds(n.getSeconds());
            this.setMinutes(n.getMinutes());
            this.setHours(n.getHours());
        }
    }
    
    if (Date.prototype.clone === undefined) {
        Date.prototype.clone = function () {
            return new Date(this.valueOf());
        }
    }

    if (Date.prototype.between === undefined) {
        Date.prototype.between = function (start, end) {
            return (this.valueOf() >= start.valueOf() &&
                    this.valueOf() <= end.valueOf());
        }
    }
    
    if (Date.prototype.compareTo === undefined) {
        Date.prototype.compareTo = function (date) {
            return Date.compare(this, date);
        }
    }

    if (Date.prototype.equals === undefined) {
        Date.prototype.equals = function (date) {
            return Date.equals(this, date);
        }
    }

    if (Date.prototype.isAfter === undefined) {
        Date.prototype.isAfter = function (date) {
            date = date ? date : new Date();
            return (this.compareTo(date) > 0);
        }
    }

    if (Date.prototype.isBefore === undefined) {
        Date.prototype.isBefore = function (date) {
            date = date ? date : new Date();
            return (this.compareTo(date) < 0);
        }
    }
    
    if (Date.prototype.getDaysBetween === undefined) {
        Date.prototype.getDaysBetween = function (date) {
            return ((date.clone().valueOf() - this.valueOf()) / 86400000) | 0;
        }
    }
    
    if (Date.prototype.getOrdinalNumber === undefined) {
        Date.prototype.getOrdinalNumber = function () {
            var date = new Date(this.getFullYear(), 0, 0);
            return date.getDaysBetween(this) + 1;
        }
    }
}());
