/*components folder is used to organize the code
and it don't need the special features provided by
the next.js for pages */

function User({users}){

    return <><h1>List of users</h1>
    {
        users.map(user => {
            return(
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            )
        })
    }
    </>
}

export default User