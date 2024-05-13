class DateTimeUtils  {
    date = new Date();

    public  getCurrentMonthName () {
        return  this.date.getMonth() +1;
    }
    public  getCurrentYearName () {
        return  this.date.getFullYear();
    }
    public  getTodayDate () {
        let dd = this.date.getDate();
        let mm = this.getCurrentMonthName();
        let yyyy = this.date.getFullYear();
        return  dd + '/' + mm + '/' + yyyy;
    }

}
export default new DateTimeUtils();