
import React, { useState, useEffect } from "react";
import axios from "axios";

function App(){

const [students,setStudents]=useState([]);
const [name,setName]=useState("");
const [email,setEmail]=useState("");

useEffect(()=>{
fetchStudents();
},[]);

const fetchStudents=async()=>{
const res=await axios.get("http://localhost:8080/students");
setStudents(res.data);
}

const addStudent=async()=>{
await axios.post("http://localhost:8080/students",{name,email});
fetchStudents();
}

const deleteStudent=async(id)=>{
await axios.delete(`http://localhost:8080/students/${id}`);
fetchStudents();
}

return(
<div style={{padding:"40px"}}>
<h2>Student Management System</h2>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
<input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

<button onClick={addStudent}>Add Student</button>

<ul>
{students.map(s=>(
<li key={s.id}>
{s.name} - {s.email}
<button onClick={()=>deleteStudent(s.id)}>Delete</button>
</li>
))}
</ul>

</div>
)
}

export default App;
