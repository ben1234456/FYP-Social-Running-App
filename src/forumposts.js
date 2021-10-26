class ForumPosts{
    static getFirstPost()
    {
        return fetch('https://socialrunningapp.herokuapp.com/api/forumposts/1')
        .then((response)=>{
            return response.json();
        })
    }
}

export default ForumPosts;