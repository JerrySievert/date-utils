(function () {

    var origParse = Date.parse;
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

    var months_abbr = [
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
    
    if (Date.prototype.getMonthAbbr === undefined) {
        Date.prototype.getMonthAbbr = function () {
            return months_abbr[this.getMonth()];
        }
    }

    var months = [
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
    
    if (Date.prototype.getMonthName === undefined) {
        Date.prototype.getMonthName = function () {
            return months[this.getMonth()];
        }
    }
    
    function pad(str, length) {
        str = String(str);
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
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
            return pad(this.getDate(), 2) + '/' + this.getMonthAbbr() + '/' + this.getFullYear() +
                ':' + pad(this.getHours(), 2) + ':' + pad(this.getMinutes(), 2) + ':' + pad(this.getSeconds(), 2) + ' ' + this.getUTCOffset();
        }
    }
    
    if (Date.prototype.today === undefined) {
        Date.prototype.today = function () {
            return new Date().clearTime();
        }
    }
    Date.today = Date.prototype.today;
    
    if (Date.prototype.clearTime === undefined) {
        Date.prototype.clearTime = function () {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);
            
            return this;
        }
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
}());
