import React, {useState, useEffect, useContext, Fragment} from 'react'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast'

const HomePage = () => {
    let id = 0;
    
    let [val, setVal] = useState([{}])
    let [records, setRecords] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        getRecords()
        
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


    let getRecords = async() =>{
        let response = await fetch('https://react-django-jwt-auth-backend.herokuapp.com/api/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setRecords(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }

    let deleterecord = async () => {
        let data = await fetch(`https://react-django-jwt-auth-backend.herokuapp.com/api/delete/${id}/`, {
            method:'DELETE',
            headers:{'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)},
        }).then((response) => response.json())
        .then((data) => {
          return data;
        });
        if(data === 'User Deleted !'){
            localStorage.setItem("message", 'Deleted Successfully !')
            window.location.reload(false);    
        }else{
            localStorage.setItem("error_message", 'Something Went Wrong !')
            window.location.reload(false);
        }
    }

    let updateUser = async()=>{
        let data = await fetch(`https://react-django-jwt-auth-backend.herokuapp.com/api/update/${id}/`,{
            method:'PUT',
            headers:{'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)},
            body:JSON.stringify(val)
        }).then((response) => response.json())
        .then((data) => {
          return data;
        });
        if(data === 'User Updated !'){
            localStorage.setItem("message", 'Updated Successfully !')
            window.location.reload(false);
        }else{
            localStorage.setItem("error_message", 'Something Went Wrong !')
            window.location.reload(false);}
        }    

    return (
        <Fragment>
        <Toaster position="top-right"/>
            <div className="container my-5">
            <h2 className="m-3 d-inline-block">User Details</h2> <button onClick={logoutUser} className="btn btn-primary" style={{float : 'right'}}>Logout</button>
            <table className="table table-bordered">
                <thead className="thead bg-warning">
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {records.map(record => (
                <tr className="bg-dark text-white" key={record.id}>
                    <th scope="row">{record.id}</th>
                    <td>{record.username}</td>
                    <td>{record.email}</td>
                    <td>{record.address}</td>
                    <td>
                    <button type="button" className="btn btn-success m-1"  data-bs-toggle="modal" data-bs-target={"#modal"+record.id.toString()} ><FontAwesomeIcon icon={faEdit}/></button>                  
                        
                    <div className="modal fade" id={"modal"+record.id.toString()} tabIndex="-1" role="dialog" aria-labelledby={"modal"+record.id.toString()+'Title'} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title text-black" id="exampleModalLabel">Update User Info</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <input type="text" className="form-control my-2" id="username" name="username" placeholder="Username" onChange={(e)=>{setVal({...val, 'username':e.target.value})}} defaultValue={record.username}/>
                                    <input type="email" className="form-control my-2" id="email" name="email" placeholder="Email" onChange={(e)=>{setVal({...val, 'email':e.target.value})}} defaultValue={record.email}/>
                                    <textarea className="form-control my-2" id="address" name="address" placeholder="Address" onChange={(e)=>{setVal({...val, 'address':e.target.value})}} defaultValue={record.address}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e)=>{
                                    id = record.id
                                    updateUser()
                                    }}>Save changes</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <button type="button" onClick={()=>{
                        id = record.id
                        deleterecord()
                        }} className="btn btn-danger m-1"><FontAwesomeIcon icon={faTrash}/></button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
            </Fragment>
    )
}

export default HomePage