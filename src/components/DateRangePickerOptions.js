import moment from 'moment';

export default class DateRangePickerOptions {
    constructor() {
        this.dateInCalcRule = -1;
        this.dateInFormat = 'dd.MM.yy HH:mm';
        this.rangeSeparator = '-';
        var thisObj = this;

        this.onPick = function (dates) {
            thisObj.dateInCalcRule = -1;
            thisObj.rangeSeparator = '-';
            thisObj.dateInFormat = 'dd.MM.yy HH:mm';
        };

        this.shortcuts = [
            {
                text: 'Last 7 days',
                onClick(picker) {
                    thisObj.dateInCalcRule = 7;
                    let arange = DateRangePickerOptions.calcRangeByRule(thisObj.dateInCalcRule, null, null);
                    thisObj.dateInFormat = '.';
                    thisObj.rangeSeparator = 'Last 7 days';
                    picker.$emit('pick', arange);
                }
            }, {
                text: 'Last 14 days',
                onClick(picker) {
                    thisObj.dateInCalcRule = 14;
                    let arange = DateRangePickerOptions.calcRangeByRule(thisObj.dateInCalcRule, null, null);
                    thisObj.dateInFormat = '.';
                    thisObj.rangeSeparator = 'Last 14 days';
                    picker.$emit('pick', arange);
                }
            }, {
                text: 'Last 30 days',
                onClick(picker) {
                    thisObj.dateInCalcRule = 30;
                    let arange = DateRangePickerOptions.calcRangeByRule(thisObj.dateInCalcRule, null, null);
                    thisObj.dateInFormat = '.';
                    thisObj.rangeSeparator = 'Last 30 days';
                    picker.$emit('pick', arange);
                }
            }, {
                text: 'Last Month',
                onClick(picker) {
                    thisObj.dateInCalcRule = 31;
                    let arange = DateRangePickerOptions.calcRangeByRule(thisObj.dateInCalcRule, null, null);
                    thisObj.dateInFormat = 'dd.MM.yy HH:mm';
                    thisObj.rangeSeparator = '-';
                    picker.$emit('pick', arange);
                }
            }, {
                text: 'Last Quarter',
                onClick(picker) {
                    thisObj.dateInCalcRule = 90;
                    let arange = DateRangePickerOptions.calcRangeByRule(thisObj.dateInCalcRule, null, null);
                    thisObj.dateInFormat = 'dd.MM.yy HH:mm';
                    thisObj.rangeSeparator = '-';
                    picker.$emit('pick', arange);
                }
            }, {
                text: 'Last Year',
                onClick(picker) {
                    thisObj.dateInCalcRule = 365;
                    let arange = DateRangePickerOptions.calcRangeByRule(thisObj.dateInCalcRule, null, null);
                    thisObj.dateInFormat = 'dd.MM.yy HH:mm';
                    thisObj.rangeSeparator = '-';
                    picker.$emit('pick', arange);
                }
            }
        ];
    }

    static calcRangeByRule(prmCalcRule, prmMinDefault, prmMaxDefault, prmPicOptions) {
        switch (prmCalcRule) {
            case -1: return [ prmMinDefault, prmMaxDefault ];
            case 365: {
                var targetYear = new Date();
                targetYear.setFullYear(targetYear.getFullYear() - 1);
                var startDate = new Date(targetYear.getFullYear(), 0, 1);
                var endDate = new Date(targetYear.getFullYear(), 12, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 0);
                return [startDate, endDate];
            };
            case 90: {
                var targetMonth = new Date();
                targetMonth.setMonth(targetMonth.getMonth() - 3);
                var targetQuater = parseInt((targetMonth.getMonth() + 1) / 3) + 1;
                var startDate = new Date(targetMonth.getFullYear(), 0 + (targetQuater - 1) * 3, 1);
                var endDate = new Date(targetMonth.getFullYear(), 3 + (targetQuater - 1) * 3, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 0);
                return [startDate, endDate];
            };
            case 31: {
                var targetMonth = new Date();
                targetMonth.setMonth(targetMonth.getMonth() - 1);
                var startDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
                var endDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 0);
                return [startDate, endDate];
            };
            case 30: {
                var now = new Date();
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 29);
                if (prmPicOptions) {
                    prmPicOptions.dateInFormat = '.';
                    prmPicOptions.rangeSeparator = 'Last 30 days';
                }
                return [date, now];
            };
            case 14: {
                var now = new Date();
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 13);
                if (prmPicOptions) {
                    prmPicOptions.dateInFormat = '.';
                    prmPicOptions.rangeSeparator = 'Last 14 days';
                }
                return [date, now];
            };
            case 7: {
                var now = new Date();
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 6);
                if (prmPicOptions) {
                    prmPicOptions.dateInFormat = '.';
                    prmPicOptions.rangeSeparator = 'Last 7 days';
                }
                return [date, now];
            }
        }
    }

    onChange (e) {
        if (e == null) {
            this.rangeSeparator = '-';
            this.dateInFormat = 'dd.MM.yy HH:mm';
        } else {

        }
        console.log('changed');
    }
}