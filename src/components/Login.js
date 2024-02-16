import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const host = "https://inotebook-s8ov.onrender.com"
// const host = "http://localhost:5000";


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = credentials;
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            console.log(json.authToken);
            localStorage.setItem('token', json.authToken); 
            props.showAlert("Logged in successfully",'success')
            history("/");
        }
        else{
          props.showAlert("Invalid credentials",'danger')
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container sign my-3'>
          <h2>Login</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3 ">
                    <label htmlFor="email" className="form-label mt-2">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label mt-2">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </div>
    )
}

export default Login



// import React, { useState } from "react";
// import {useNavigate} from 'react-router-dom'

// const Login = (props) => {
//     const [cred, setCred] = useState({email:"", password:""});
//     let history = useNavigate();

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         const host = 'localhost:5000';
//         const url = `${host}/api/auth/login`;
//         const response = await fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({email:cred.email, password:cred.password})
//       });
//       const output = await response.json(); // parses JSON response into native JavaScript objects
//       if(output.success){
//         localStorage.setItem('token', output.authtoken)
//         props.showAlert("Logged in successfully",'success')
//         history.push('/');
//       }
//       else{
//         props.showAlert("Invalid credentials",'danger')
        
//       }
//       console.log(output)
//     }
//     const onChange=(e)=>{
//         e.preventDefault();
//         setCred({...cred, [e.target.name]:e.target.value});
//     }

//   return (
//     <div className="container mt-3">
//         <h2>Login to continue to iNotebook</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             value={cred.email}
//             onChange={onChange}
//             aria-describedby="emailHelp"
//           />
//           <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             onChange={onChange}
//             value={cred.password}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
