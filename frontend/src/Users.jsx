import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Users(){
    const [users,setUsers]=useState([
    { Name: "Shweta" , Email: "s1@gmail.com", Age: 22 }
    ])
    return(
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/" className='btn btn-danger'>Create + </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return <tr key={index}>
                                    {/* and make the name ,email,age small */}
                                    <td>{user.name}</td> 
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <button className="btn btn-secondary">Update</button>
                                        {/* <Link to={`/update/${user._id}`} className='btn btn-success'>Update </Link> */}
                                        <button className='btn btn-dark' onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Users;