class CalendarEvents{
    static getFirstCalendarEvent()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/calendar/1')
        .then((response)=>{
            return response.json();
        })
    }

}

export default CalendarEvents;