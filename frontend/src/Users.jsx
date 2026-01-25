import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Users(){
    const [users,setUsers]=useState([
    { name: "Shweta" , email: "s1@gmail.com" }
    ])
    
    useEffect(() => { 
        axios.get('http://localhost:3001/users')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[])
    return(
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/" className='btn btn-danger'>Create + </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => {
                        // Combine names safely
                        const fullName = [user.firstName, user.middleName, user.lastName]
                                        .filter(Boolean) // removes empty strings
                                        .join(" ");

                        return (
                        <tr key={index}>
                            <td>{fullName || "No Name"}</td> 
                            <td>{user.email}</td>
                            <td>
                            <button className="btn btn-secondary">Update</button>
                            <button
                                className='btn btn-dark'
                                onClick={() => handleDelete(user._id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default Users;