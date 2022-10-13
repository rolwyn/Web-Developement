export default class Helpers {
    static convertDate(todaysDate) {
        let tDate = new Date(todaysDate),
            tmonth = '' + (tDate.getMonth() + 1),
            tday = '' + tDate.getDate(),
            tyear = tDate.getFullYear()
    
        if (tmonth.length < 2) 
            tmonth = '0' + tmonth
        if (tday.length < 2)
            tday = '0' + tday
    
        return [tyear, tmonth, tday].join('-')
    }
}