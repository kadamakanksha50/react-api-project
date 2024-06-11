import React, { useState } from "react";
import './Dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {ToastContainer, toast }from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard(){
    const navigate = useNavigate();
    useEffect(()=>{
        let user=localStorage.getItem('token')
        if(user===null){
            navigate('/')
        }
    },[])

    const [actionButton,setActionButton]=useState('')
    const [fullname,setFullname]=useState('')
    const [email,setEmail]=useState('')
    const [department,setDepartment]=useState('')
    const [contact,setContact]=useState('')
    const [address,setAddress]=useState('')
    const [marks,setMarks]=useState('')
    const [process,setProcess]=useState(false)
    const [student,setStudent]=useState([])
    const [isDelete,setDelete]=useState(false)
    const [tempFullname,setTempFullname]=useState('')

    const notify = (message) => toast(message);

    const onFullnameChange=(e)=>{
        setFullname(e.target.value)
    }
    const onEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const onDepartmentChange=(e)=>{
        setDepartment(e.target.value)
    }
    const onContactChange=(e)=>{
        setContact(e.target.value)
    }
    const onAddressChange=(e)=>{
        setAddress(e.target.value)
    }
    const onMarksChange=(e)=>{
        setMarks(e.target.value)
    }
    const fetchStudent = async()=>{
        const res = await fetch('http://127.0.0.1/react/getStudent.php');
        const data = await res.json()
        
        setStudent(data.message)
        console.log(student)
    }
    const deleteStudent=(fullname)=>{
        setDelete(true)
        setTempFullname(fullname)
    }
    const onReject=()=>{
        setDelete(false)
    }
    fetchStudent()
    const onStudentReset=(e)=>{
        setActionButton('Add Details')
        setFullname('')
        setEmail('')
        setDepartment('')
        setContact('')
        setAddress('')
        setMarks('')
    }

    const onStudentSubmit= async (e)=>{
        e.preventDefault();
        setProcess(true)
        if(actionButton==='Add Details'){
            const res = await fetch('http://localhost/react/student.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({fullname,email,department,contact,address,marks})
            })
            const data = await res.json();
            console.log(data)
            setTimeout(()=>{
                setActionButton('Add Details')
                setFullname('')
                setEmail('')
                setDepartment('')
                setContact('')
                setAddress('')
                setMarks('')
                notify('Details Added Successfully !!')
                setProcess(false)
            },1000)
        }else if(actionButton==='Edit Student'){
            const res = await fetch('http://localhost/react/updateStudent.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({fullname,email,department,contact,address,marks})
            })
            const data = await res.json();
            console.log(data)
            setTimeout(()=>{
                setActionButton('Add Details')
                setFullname('')
                setEmail('')
                setDepartment('')
                setContact('')
                setAddress('')
                setMarks('')
                notify('Details Updated Successfully !!')
                setProcess(false)
            },1000)
        }
    }
    const selectStudent=(index)=>{
        setActionButton('Edit Student')
        setFullname(student[index].fullname)
        setEmail(student[index].email)
        setDepartment(student[index].department)
        setContact(student[index].contact)
        setAddress(student[index].address)
        setMarks(student[index].marks)
    }
    const delete1 = async()=>{
        setDelete(false)
        const res = await fetch('http://localhost/react/deleteStudent.php',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({fullname:tempFullname})
        })
        const data = await res.json();
        setTimeout(()=>{
            setActionButton('Add Details')
            setFullname('')
            setEmail('')
            setDepartment('')
            setContact('')
            setAddress('')
            setMarks('')
            notify('Details deleted Successfully !!')
            setProcess(false)
            fetchStudent()
        },1000)
    }

    return(
        <>
        {isDelete && (<div className="show">
            <div className="box">
                <h2>Do you want to delete this information</h2>
                <div className="actions">
                    <button onClick={()=>delete1()}>Yes</button>
                    <button onClick={()=>onReject()}>No</button>
                </div>
            </div>
        </div>)}
        <div className="dash-container">
            <div className="header">
                <div className="title">
                    <h2>Dashboard</h2>
                </div>
                <div className="nav">
                    <a>Home</a>
                    <a>About Us</a>
                    <a>Products</a>
                    <a>Contact Us</a>
                    <Link to="/"><span>Logout</span></Link>
                </div>
            </div>
            <div className="contain">
            <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Full Name</th>
                                <th>Email ID</th>
                                <th>Department</th>
                                <th>Mobile No</th>
                                <th>Address</th>
                                <th>Marks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student && student.map((student,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{student.fullname}</td>
                                        <td>{student.email}</td>
                                        <td>{student.department}</td>
                                        <td>{student.contact}</td>
                                        <td>{student.address}</td>
                                        <td>{student.marks}</td>
                                        <td className="table-action">
                                            <button onClick={()=>selectStudent(index)}><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={()=>deleteStudent(student.fullname)}><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="form-container">
                    <form onSubmit={onStudentSubmit} onReset={onStudentReset}>
                        <div className="title2">
                            <h2>Fill Your Details</h2>
                        </div>
                        <div className="input-field1">
                            <input type="text" placeholder="Full Name" className={process ? 'disabled' : ''} value={fullname} onChange={onFullnameChange}></input>
                        </div>
                        <div className="input-field1">
                            <input type="email" placeholder="Email ID" className={process ? 'disabled' : ''} value={email} onChange={onEmailChange}></input>
                        </div>
                        <div className="input-field1">
                            <input type="text" placeholder="Department" className={process ? 'disabled' : ''} value={department} onChange={onDepartmentChange}></input>
                        </div>
                        <div className="input-field1">
                            <input type="number" placeholder="Mobile No" className={process ? 'disabled' : ''} value={contact} onChange={onContactChange}></input>
                        </div>
                        <div className="input-field1">
                            <input type="text" placeholder="Address" className={process ? 'disabled' : ''} value={address} onChange={onAddressChange}></input>
                        </div>
                        <div className="input-field1">
                            <input type="number" placeholder="Marks" className={process ? 'disabled' : ''} value={marks} onChange={onMarksChange}></input>
                        </div>
                        <div className="action">
                            <input type="submit" value={actionButton}></input>
                            <input type="reset" value="Cancel"></input>
                        </div>
                    </form>
                </div>
                
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
        </>
    )
}
export default Dashboard;