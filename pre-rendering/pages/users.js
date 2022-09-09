//To get static props from external api and pre-render it

import User from "../components/user"

//It is not how we will write in production
function UserList({users}){
    return <><h1>List of users</h1>
    {
        users.map(user => {
            return(
                <div key={user.id}>
                    <User users={users}/>
                </div>
            )
        })
    }
    </>
}

export default UserList

export async function getStaticProps(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    console.log(data);
    return {props: {users: data}}
}