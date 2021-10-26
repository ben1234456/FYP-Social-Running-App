class UserEvents{
    static getFirstUserEvent()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/userevents/1')
        .then((response)=>{
            return response.json();
        })
    }

}

export default UserEvents;