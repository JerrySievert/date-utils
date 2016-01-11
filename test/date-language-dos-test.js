/*test con variable*/
var dateUtils = require('../lib/date-utils.js');
dateUtils.language("es");
console.log('---------Sapnish---------')
console.log(new Date().addMonths(1).addDays(1).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(2).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(3).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(4).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(5).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(6).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(7).toFormat('DDDD DD MMM de YYYY'));

/*day*/
console.log('----Days-----')
console.log(new Date().toFormat('D'))
console.log(new Date().toFormat('DD'))
console.log(new Date().toFormat('DDD'))
console.log(new Date().toFormat('DDDD'))
console.log('--------------')

/*month*/
console.log('----Months-----')
console.log(new Date().toFormat('M'))
console.log(new Date().toFormat('MM'))
console.log(new Date().toFormat('MMM'))
console.log(new Date().toFormat('MMMM'))
console.log('--------------')

/*year*/
console.log('----Years-----')
console.log(new Date().toFormat('YY'))
console.log(new Date().toFormat('YYYY'))
console.log('--------------')
console.log('---------End Sapnish---------')

dateUtils.language("fr");
console.log('---------French---------')
console.log(new Date().addMonths(11).addDays(1).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(2).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(3).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(4).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(5).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(6).toFormat('DDDD DD MMM de YYYY'));
console.log(new Date().addMonths(1).addDays(7).toFormat('DDDD DD MMM de YYYY'));

/*day*/
console.log('----Days-----')
console.log(new Date().toFormat('D'))
console.log(new Date().toFormat('DD'))
console.log(new Date().toFormat('DDD'))
console.log(new Date().toFormat('DDDD'))
console.log('--------------')

/*month*/
console.log('----Months-----')
console.log(new Date().toFormat('M'))
console.log(new Date().toFormat('MM'))
console.log(new Date().toFormat('MMM'))
console.log(new Date().toFormat('MMMM'))
console.log('--------------')

/*year*/
console.log('----Years-----')
console.log(new Date().toFormat('YY'))
console.log(new Date().toFormat('YYYY'))
console.log('--------------')
console.log('---------End French---------')