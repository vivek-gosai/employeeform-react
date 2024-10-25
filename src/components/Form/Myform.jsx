
import React, { useEffect, useState } from 'react';
import '../../App.css'
//this function get data on localstorage
const getdata = () =>{
    let ndata=JSON.parse(localStorage.getItem("data")) || [];
    return ndata;
}
// creat main function
const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        id:"",
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        dateOfHire: '',
        salary: ''
    });
//storage
const [storage, setstorage]=useState(getdata());
//handle our data and get value from user and stor in state
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    };
// full form submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Employee Data:', formData);
        let newid ={...formData,id :parseInt(Math.random()*1000)}// for generate our id
        console.log(newid);
        if(formData.id != ""){
            let updatedata = storage.map((item)=>{
                if(formData.id==item.id){
                    return formData;
                }
                else{
                    return item;
                }
            });
            setstorage(updatedata)
        }
        else{
         return setstorage([...storage,newid]);
        }

        setFormData({
            id:"",
            name: '',
            email: '',
            phone: '',
            position: '',
            department: '',
            dateOfHire: '',
            salary: ''
        });
    };
// this fun for delete record
    const delrec =(id)=>{
            let newrec = storage.filter((uid)=>uid.id!=id)
            setstorage(newrec)
    }
// this is for last rendering
    const edit =(id)=>{
        let editdata = storage.find((uid)=>uid.id===id)
        if(editdata){
            setFormData(editdata)
        }
    }
 useEffect(()=>{
    console.log(storage);
    localStorage.setItem("data",JSON.stringify(storage))
    
 },[storage]);
// web output code
    return (
        <>
         <div className="form-container">
            <h1>Employee Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formData.id} hidden/>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text"  id="email" name="email" value={formData.email}onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone}onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" name="position" value={formData.position} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input type="text" id="department" name="department"value={formData.department}onChange={handleChange}
                       
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfHire">Date of Hire:</label>
                    <input type="date"id="dateOfHire"name="dateOfHire"value={formData.dateOfHire} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number" id="salary" name="salary" value={formData.salary}  onChange={handleChange}/>
                </div>
              <div>
              <button type="submit" className="submit-button">Submit</button>
                </div>  
            </form>
        </div>
        <h1>Employee Records</h1>
        <div className='records'>
            <table cellPadding={3} >
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Salary</th>  
                    <th>Action</th>  
                </tr>
                <tbody>
                    {
                        storage.map((item)=>(
                            <>
                            <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.position}</td>
                            <td>{item.department}</td>
                            <td>{item.dateOfHire}</td>
                            <td>{item.salary}</td>
                            <td><button className="delete-button" onClick={() => delrec(item.id)}>Delete</button><button className="delete-button" onClick={() => edit(item.id)}>Edit</button></td>
                            </tr>
                       </>
                        ))
                    }                  
                </tbody>
            </table>
        </div>
        </>
       
    );
};

export default EmployeeForm;
