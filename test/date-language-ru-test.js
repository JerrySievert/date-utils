var vows = require('vows');
var assert = require('assert');

require('../lib/date-utils.min.js').language('ru');

vows.describe('Date language Russian').addBatch({
    'spanish dates are correct': {
        topic: function () {
            var instance = new Date('January 1, 2016 16:00:00');

            return instance;
        },
        'DDDD is correctly set': function (topic) {
            assert.equal(topic.toFormat('DDDD'), 'Пятница');
        },
        'MMMM is correctly set': function (topic) {
            assert.equal(topic.toFormat('MMMM'), 'Январь')
        }
    },

    'can return correct months in russian with MMM': {
        topic: function (){
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Ene correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMM'), 'Янв'); },
        'returns Feb correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Фев'); },
        'returns Mar correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Мар'); },
        'returns Abr correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Апр'); },
        'returns May correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Май'); },
        'returns Jun correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Июн'); },
        'returns Jul correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Июл'); },
        'returns Ago correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Авг'); },
        'returns Sep correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Сен'); },
        'returns Oct correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Окт'); },
        'returns Nov correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Ноя'); },
        'returns Dic correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Дек'); },
    },

    'can return correct months in russian with MMMM': {
        topic: function () {
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Enero correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMMM'), 'Январь'); },
        'returns Febrero correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Февраль'); },
        'returns Marzo correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Март'); },
        'returns Abril correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Апрель'); },
        'returns Mayo correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Май'); },
        'returns Junio correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Июнь'); },
        'returns Julio correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Июль'); },
        'returns Agosto correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Август'); },
        'returns Septiembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Сентябрь'); },
        'returns Octubre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Октябрь'); },
        'returns Noviembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Ноябрь'); },
        'returns Diciembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Декабрь'); },
    },

    'can return correct days in russian with DDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Dom correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDD'), 'Вс'); },
        'returns Lun correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Пн'); },
        'returns Mar correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Вт'); },
        'returns Mie correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Ср'); },
        'returns Jue correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Чт'); },
        'returns Vie correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Пт'); },
        'returns Sab correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Сб'); },
    },

    'can return correct days in russian with DDDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Domingo correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDDD'), 'Воскресенье'); },
        'returns Lunes correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Понедельник'); },
        'returns Martes correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Вторник'); },
        'returns Miércoles correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Среда'); },
        'returns Jueves correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Четверг'); },
        'returns Viernes correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Пятница'); },
        'returns Sábado correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Суббота'); },
    }
}).export(module);
