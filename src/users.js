class Users{
    static getFirstUser()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/users/1')
        .then((response)=>{
            return response.json();
        })
    }

    static getUserList()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/users/list/1')
        .then((response)=>{
            return response.json();
        })
    }
}

export default Users;