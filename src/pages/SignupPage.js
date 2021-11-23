import React, {useContext, useEffect, Fragment} from 'react'
import AuthContext from '../context/AuthContext'
import toast, {Toaster} from 'react-hot-toast'

const SignupPage = () => {
    let {signupUser} = useContext(AuthContext)

    useEffect(()=> {

      if(localStorage.getItem("message"))
      {
          toast.success(localStorage.getItem("message"), {duration: 5000,})
          localStorage.removeItem("message");
      }
      
      if(localStorage.getItem("error_message"))
      {
          toast.error(localStorage.getItem("error_message"), {duration: 5000,})
          localStorage.removeItem("error_message");
      }

  }, [])

    return (
        <Fragment>
        <Toaster/>
        <div className="container m-5">
        <h1>Sign up for Namasys</h1>
      
        <div className="form-group">
          <form onSubmit={signupUser}>
            <input type="text" className="form-control my-3" placeholder="Username" name="username"/>
            <input type="password" className="form-control my-3" placeholder="Password1" name="password1"/>
            <input type="password" className="form-control my-3" placeholder="Password2" name="password2"/>
            <input type="email" className="form-control my-3" placeholder="Email" name="email"/>
            <textarea className="form-control my-3" placeholder="Address" name="address"></textarea>
            <button className="btn btn-primary" type="submit">Sign Up</button>
            <a className="btn btn-primary m-2" href="/login">Login</a>
          </form>
        </div>
      </div>
      </Fragment>
    )
}

export default SignupPage
