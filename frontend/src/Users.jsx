import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Users(){
    const [users,setUsers]=useState([
    { name: "Shweta" , email: "s1@gmail.com" }
    ])
    //to see the all users on view page
    useEffect(() => { 
        axios.get('http://localhost:3001/users')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[])
//to dlt the user by id:
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(result => {console.log(result)
            window.location.reload()
            })
        .catch(err => console.log(err))
    }
return (
  <div
    className="min-vh-100 d-flex justify-content-center align-items-start py-5"
    style={{
      background: "linear-gradient(to right, #dae2ee, #c3cfe2)", // neutral gray gradient
      fontFamily: "'Inter', sans-serif",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          {/* Card */}
          <div
            className="rounded-5 p-4 p-md-5"
            style={{
              background: "#FFFFFF",
              maxWidth: "900px",
              width: "100%",
              boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
              transition: "all 0.3s ease",
            }}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3
                style={{
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Users
              </h3>

              <Link
                to="/"
                style={{
                  background: "linear-gradient(135deg, #111827, #374151)",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 18px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(0,0,0,0.25)";
                }}
              >
                Create +
              </Link>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr
                    style={{
                      background: "#F9FAFB",
                    }}
                  >
                    <th style={{ color: "#111827", fontWeight: 600 }}>Name</th>
                    <th style={{ color: "#111827", fontWeight: 600 }}>Email</th>
                    <th
                      className="text-center"
                      style={{ color: "#111827", fontWeight: 600 }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => {
                    const fullName = [
                      user.firstName,
                      user.middleName,
                      user.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <tr
                        key={index}
                        style={{
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#F3F4F6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {/* Name */}
                        <td
                          style={{
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {fullName || "No Name"}
                        </td>

                        {/* Email */}
                        <td
                          style={{
                            color: "#4B5563",
                          }}
                        >
                          {user.email}
                        </td>

                        {/* Actions */}
                        <td className="text-center">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            {/* Update */}
                            <Link
                              to={`/update/${user._id}`}
                              style={{
                                background:
                                  "linear-gradient(135deg, #374151, #111827)",
                                color: "#FFFFFF",
                                padding: "6px 16px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 500,
                                textDecoration: "none",
                                boxShadow:
                                  "0 6px 14px rgba(0,0,0,0.25)",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-1px)";
                                e.currentTarget.style.boxShadow =
                                  "0 8px 18px rgba(0,0,0,0.35)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 14px rgba(0,0,0,0.25)";
                              }}
                            >
                              Update
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(user._id)}
                              style={{
                                background:
                                  "linear-gradient(135deg, #6B7280, #374151)",
                                color: "#FFFFFF",
                                padding: "6px 16px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 500,
                                border: "none",
                                cursor: "pointer",
                                boxShadow:
                                  "0 6px 14px rgba(0,0,0,0.25)",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-1px)";
                                e.currentTarget.style.boxShadow =
                                  "0 8px 18px rgba(0,0,0,0.35)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 14px rgba(0,0,0,0.25)";
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);



}


export default Users;