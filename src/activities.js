class Activities{
    static getFirstActivity()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/activities/1')
        .then((response)=>{
            return response.json();
        })
    }
}

export default Activities;