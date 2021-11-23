import React, {useContext, Fragment, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext);
    let history = useHistory();

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
        <h1>Log in Namasys</h1>
      
        <div className="form-group">
          <form onSubmit={loginUser}>
            <input type="text" className="form-control my-3" placeholder="Username" name="username"/>
            <input type="password" className="form-control my-3" placeholder="password" name="password"/>
            <button className="btn btn-primary" type="submit">Login</button>
            <button className="btn btn-primary m-2" onClick={()=>{history.push("/signup")}} >Sign Up</button>
          </form>
        </div>
      </div>
      </Fragment>
    )
}

export default LoginPage