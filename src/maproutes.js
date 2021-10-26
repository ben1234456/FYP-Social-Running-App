class Routes{
    static getFirstRoute()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/route/1')
        .then((response)=>{
            return response.json();
        })
    }
}

export default Routes;