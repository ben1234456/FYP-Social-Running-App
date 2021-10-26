class Buddies{
    static getFirstBuddy()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/buddy/1')
        .then((response)=>{
            return response.json();
        })
    }

    static getFirstBuddyRequest()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/buddyrequest/1')
        .then((response)=>{
            return response.json();
        })
    }
}

export default Buddies;