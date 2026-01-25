import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

function Update(){
    return(
                <div className="d-flex vh-100 bg-dark justify-content-center align-items-center"> 
            <div className='w-50 bg-white rounded p-3'>
                <form >
                    <h2>Update Details</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' 
                        // onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' 
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder='Enter Age' className='form-control' 
                        // onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='btn btn-dark'>Update</button>
                </form>
            </div>
            
        </div>
    );
}
export default Update;