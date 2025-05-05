import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  // State's
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  let API_URL;
  if (process.env.REACT_APP_MODE === "production") {
      API_URL = process.env.REACT_APP_API_URL_PROD;
  } else {
      API_URL = process.env.REACT_APP_API_URL_DEV;
  }

  const login = async () => {
    console.log("Login executed", formData);
    let responseData;
    await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    } else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Signup executed", formData);
    let responseData;
    await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    } else {
      alert(responseData.errors)
    }
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account ? <span onClick={() => { setState("Login") }}>Login</span></p> : <></>}
        {state === "Login" ? <p className='loginsignup-login'>Create an account ? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p> : <></>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup