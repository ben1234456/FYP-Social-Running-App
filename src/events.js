class Events{
    static getFirstEvent()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/events/1')
        .then((response)=>{
            return response.json();
        })
    }

    static getExclusiveEvent()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/events/exclusive/1')
        .then((response)=>{
            return response.json();
        })
    }
}

export default Events;