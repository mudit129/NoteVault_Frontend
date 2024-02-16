import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
const host = "https://inotebook-s8ov.onrender.com"
// const host = "http://localhost:5000";

const Signup = (props) => {
    const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""});
    let history = useNavigate();
    const onChange=(e)=>{
        e.preventDefault();
        setCred({...cred, [e.target.name]:e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = `${host}/api/auth/createuser`;
        const {name, email, password} = cred;

        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        });
        const output = await response.json();
        if(output.success){
            localStorage.setItem('token', output.authToken)
            props.showAlert("Account created successfully",'success')
            history("/");
        }
        else{
            props.showAlert("Invalid credentials",'danger')
        }
        console.log(output)
    }

  return (
    <div className="container sign mt-3">
        <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label mt-2">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={cred.name}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mt-2">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={cred.email}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label mt-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={cred.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label mt-2">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={cred.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
