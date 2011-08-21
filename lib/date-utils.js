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
    var idx, name, name2, name3;

    // constants
    var monthsFull = 'January0February0March0April0May0June0July0August0September0October0November0December'.split(0);
    var monthsAbbr = [];
    var monthNames = {};

    idx = 12;
    while (idx--) {
      name = monthsFull[idx];
      monthsAbbr[idx] = name.substr(0, 3);
      name = name.toLowerCase();
      monthNames[name.substr(0, 3)] = monthNames[name] = idx;
    }

    var monthsAll = monthsFull.concat(monthsAbbr);

    var daysFull = 'saturday0friday0thursday0wednesday0tuesday0monday0sunday'.split(0);
    var daysAll = [];
    var dayNames = {};

    idx = 7;
    while (idx--) {
      name = daysFull[idx];
      name2 = name.substr(0, 2);
      name3 = name.substr(0, 3);
      daysAll.push(name2, name3, name);
      dayNames[name2] = dayNames[name3] = dayNames[name] = 6 - idx;
    }

    var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


    // private helper functions
    /** @ignore */
    function pad(num, length) {
        return (num + 10000 + '').substr(5 - length);
    }

    var isInteger = function (str) {
        return /^\d+$/.test(str);
    };
    var getInt = function (str, i, minlength, maxlength) {
        for (var x = maxlength; x >= minlength; x--) {
            var token = str.substr(i, x);
            if (token.length < minlength) {
                return null;
            }
            if (isInteger(token)) {
                return token;
            }
        }
        return null;
    };

    // static class methods
    var origParse = Date.parse;
    // ------------------------------------------------------------------
    // getDateFromFormat( date_string , format_string )
    //
    // This function takes a date string and a format string. It matches
    // If the date string matches the format string, it returns the 
    // getTime() of the date. If it does not match, it returns NaN.
    // Original Author: Matt Kruse <matt@mattkruse.com>
    // WWW: http://www.mattkruse.com/
    // Adapted from: http://www.mattkruse.com/javascript/date/source.html
    // ------------------------------------------------------------------

    
    var getDateFromFormat = function (val, format) {
        val = val + "";
        format = format + "";
        var iVal = 0;
        var iFormat = 0;
        var c = "";
        var token = "";
        var token2 = "";
        var x, y;
        var now = new Date;
        var year = now.getYear();
        var month = now.getMonth() + 1;
        var date = 1;
        var hh = 0;
        var mm = 0;
        var ss = 0;
        var ampm = "";



        while (iFormat < format.length) {
            // Get next token from format string
            c = format.charAt(iFormat);
            token = "";
            while (format.charAt(iFormat) === c && iFormat < format.length) {
                token += format.charAt(iFormat++);
            }
            // Extract contents of value based on format token
            if (/^y(y|yyy)?$/.test(token)) {
                x = y = token.length;
                if (token === "y") {
                    x = 2;
                    y = 4;
                }
                year = getInt(val, iVal, x, y);
                if (year === null) {
                    return NaN;
                }
                iVal += year.length;
                if (year.length === 2) {
                    year += year > 70 ? 1900 : 2000;
                }
            } else if (token === "MMM" || token === "NNN") {
                month = 0;
                for (var i = 0; i < monthsAll.length; i++) {
                    var monthName = monthsAll[i];
                    if (val.substr(iVal, monthName.length).toLowerCase() === monthName.toLowerCase()) {
                        if (token === "MMM" || (token === "NNN" && i > 11)) {
                            month = (i + 1) % 12;
                            iVal += monthName.length;
                            break;
                        }
                    }
                }
                if (month < 1 || month > 12) {
                    return NaN;
                }
            } else if (/^EE?$/.test(token)) {
                for (var n = 0; n < daysAll.length; n++) {
                    var dayName = daysAll[n], len = dayName.length;
                    if (val.substr(iVal, len).toLowerCase() === dayName.toLowerCase()) {
                        iVal += len;
                        break;
                    }
                }
            } else if (/^MM?$/.test(token)) {
                month = getInt(val, iVal, token.length, 2);
                if (month === null || month < 1 || month > 12) {
                    return NaN;
                }
                iVal += month.length;
            } else if (/^dd?$/.test(token)) {
                date = getInt(val, iVal, token.length, 2);
                if (date === null || date < 1 || date > 31) {
                    return NaN;
                }
                iVal += date.length;
            } else if (/^hh?$/.test(token)) {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || hh < 1 || hh > 12) {
                    return NaN;
                }
                iVal += hh.length;
            } else if (/^HH?$/.test(token)) {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || hh < 0 || hh > 23) {
                    return NaN;
                }
                iVal += hh.length;
            } else if (/^KK?$/.test(token)) {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || hh < 0 || hh > 11) {
                    return NaN;
                }
                iVal += hh.length;
            } else if (/^kk?$/.test(token)) {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || hh < 1 || hh > 24) {
                    return NaN;
                }
                iVal += hh.length;
                hh--;
            } else if (/^mm?$/.test(token)) {
                mm = getInt(val, iVal, token.length, 2);
                if (mm === null || mm < 0 || mm > 59) {
                    return NaN;
                }
                iVal += mm.length;
            } else if (/^ss?$/.test(token)) {
                ss = getInt(val, iVal, token.length, 2);
                if (ss === null || ss < 0 || ss > 59) {
                    return NaN;
                }
                iVal += ss.length;
            } else if (token === "a") {
                ampm = val.substr(iVal, 2).toUpperCase();
                if (!/[ap]m/i.test(ampm)) {
                    return NaN;
                }
                iVal += 2;
            } else {
                if (val.substr(iVal, token.length) !== token) {
                    return NaN;
                }
                iVal += token.length;
            }
        }
        // If there are any trailing characters left in the value, it doesn't match
        if (iVal !== val.length) {
            return NaN;
        }
        // Is date valid for month?
        if (month === 2) {
            // Check for leap year
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) { // leap year
                if (date > 29) {
                    return NaN;
                }
            } else {
                if (date > 28) {
                    return NaN;
                }
            }
        }
        if (/^[469]$|^11$/.test(month) && date > 30) {
            return NaN;
        }
        // Correct hours value
        if (hh < 12 && ampm === "PM") {
            hh += 12;
        } else if (hh > 11 && ampm === "AM") {
            hh -= 12;
        }
        return +new Date(year, month - 1, date, hh, mm, ss);
    };


    /** @ignore */
    Date.parse = function (date, format) {
        if (format) {
            return getDateFromFormat(date, format);
        }
        var timestamp = origParse(date), minutesOffset = 0, match;
        if (isNaN(timestamp) && (match = /^(\d{4}|[+-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?))?/.exec(date))) {
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

    function polyfill(name, func) {
        if (Date.prototype[name] === undefined) {
            Date.prototype[name] = func;
        }
    }

    /**
        Returns new instance of Date object with the date set to today and
        the time set to midnight
        @returns {Date} Today's Date
        @function
     */
    Date.today = function () {
        return new Date().clearTime();
    };

    /**
        Returns new instance of Date object with the date set to tomorrow and
        the time set to midnight
        @returns {Date} Tomorrow's Date
        @function
     */
    Date.tomorrow = function () {
        return Date.today().add({days: 1});
    };

    /**
        Returns new instance of Date object with the date set to yesterday and
        the time set to midnight
        @returns {Date} Yesterday's Date
        @function
     */
    Date.yesterday = function () {
        return Date.today().add({days: -1});
    };

    Date.validateDay = function (day, year, month) {
        var date = new Date(year, month, day);
        return (date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day);
    };

    Date.validateYear = function (year) {
        return (year >= 0 && year <= 9999);
    };

    Date.validateSecond = function (second) {
        return (second >= 0 && second < 60);
    };

    Date.validateMonth = function (month) {
        return (month >= 0 && month < 12);
    };

    Date.validateMinute = function (minute) {
        return (minute >= 0 && minute < 60);
    };

    Date.validateMillisecond = function (milli) {
        return (milli >= 0 && milli < 1000);
    };

    Date.validateHour = function (hour) {
        return (hour >= 0 && hour < 24);
    };

    Date.compare = function (date1, date2) {
        return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
    };

    Date.equals = function (date1, date2) {
        return +date1 === +date2;
    };

    Date.getDayNumberFromName = function (name) {
        return dayNames[name.toLowerCase()];
    };

    Date.getMonthNumberFromName = function (name) {
        return monthNames[name.toLowerCase()];
    };

    Date.isLeapYear = function (year) {
        return new Date(year, 1, 29).getDate() === 29;
    };

    Date.getDaysInMonth = function (year, month) {
        return month === 1 ? Date.isLeapYear(year) ? 29 : 28 : daysInMonth[month];
    };

    polyfill('getMonthAbbr', function () {
        return monthsAbbr[this.getMonth()];
    });

    polyfill('getMonthName', function () {
        return monthsFull[this.getMonth()];
    });

    polyfill('getUTCOffset', function () {
        var offset = -this.getTimezoneOffset(), prefix = '';
        if (offset < 0) {
            offset = -offset;
            prefix = '-';
        }
        return prefix + pad(offset / 0.6, 4);
    });

    polyfill('toCLFString',  function () {
        return pad(this.getDate(), 2) + '/' + this.getMonthAbbr() + '/' +
               this.getFullYear() + ':' + pad(this.getHours(), 2) + ':' +
               pad(this.getMinutes(), 2) + ':' + pad(this.getSeconds(), 2) +
               ' ' + this.getUTCOffset();
    });

    polyfill('toYMD', function (separator) {
        separator = separator || '-';
        return this.getFullYear() + separator + pad(this.getMonth() + 1, 2) +
            separator + pad(this.getDate(), 2);
    });

    polyfill('toDBString', function () {
        return this.getUTCFullYear() + '-' +  pad(this.getUTCMonth() + 1, 2) + 
               '-' + pad(this.getUTCDate(), 2) + ' ' + pad(this.getUTCHours(), 2) + 
               ':' + pad(this.getUTCMinutes(), 2) + ':' + pad(this.getUTCSeconds(), 2);
    });

    polyfill('clearTime', function () {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);

        return this;
    });

    polyfill('add', function (obj) {
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
    });

    polyfill('addMilliseconds', function (milliseconds) {
        return this.add({ milliseconds: milliseconds });
    });

    polyfill('addSeconds', function (seconds) {
        return this.add({ seconds: seconds });
    });

    polyfill('addMinutes', function (minutes) {
        return this.add({ minutes: minutes });
    });

    polyfill('addHours', function (hours) {
        return this.add({ hours: hours });
    });

    polyfill('addDays', function (days) {
        return this.add({ days: days });
    });

    polyfill('addWeeks', function (weeks) {
        return this.add({ days: (weeks * 7) });
    });

    polyfill('addMonths', function (months) {
        return this.add({ months: months });
    });

    polyfill('addYears', function (years) {
        return this.add({ years: years });
    });

    polyfill('setTimeToNow', function () {
        var n = new Date;
        this.setMilliseconds(n.getMilliseconds());
        this.setSeconds(n.getSeconds());
        this.setMinutes(n.getMinutes());
        this.setHours(n.getHours());
    });

    polyfill('clone', function () {
        return new Date(+this);
    });

    polyfill('between', function (start, end) {
        return this >= start && this <= end;
    });

    polyfill('compareTo', function (date) {
        return Date.compare(this, date);
    });

    polyfill('equals', function (date) {
        return Date.equals(this, date);
    });

    polyfill('isAfter', function (date) {
        return this.compareTo(date || new Date) > 0;
    });

    polyfill('isBefore', function (date) {
        return this.compareTo(date || new Date) < 0;
    });

    polyfill('getDaysBetween', function (date) {
        return ((date.clone() - this) / 86400000) | 0;
    });

    polyfill('getHoursBetween', function (date) {
        return ((date.clone() - this) / 3600000) | 0;
    });

    polyfill('getMinutesBetween', function (date) {
        return ((date.clone() - this) / 60000) | 0;
    });

    polyfill('getSecondsBetween', function (date) {
        return ((date.clone() - this) / 1000) | 0;
    });
    
    polyfill('getOrdinalNumber', function () {
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
    });

    polyfill('toFormat', function (format) {
        return format.replace('YYYY', this.getFullYear())
                     .replace('YY', ('' + this.getFullYear()).slice(-2))
                     .replace('MM', pad(this.getMonth() + 1, 2))
                     .replace('DD', pad(this.getDate(), 2))
                     .replace('HH24', pad(this.getHours(), 2))
                     .replace('HH', pad((this.getHours() % 12), 2))
                     .replace('MI', pad(this.getMinutes(), 2))
                     .replace('SS', pad(this.getSeconds(), 2));
    });
}());
