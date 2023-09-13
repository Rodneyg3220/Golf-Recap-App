import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import sendRequest from "../utilities/send-request";

export default function EditRoundPage() {
  
  const[newEdit, setNewEdit] = useState()
  const params = useParams()
  const navigate = useNavigate();


useEffect(() => {
    const fetchEdits = async () => {
    const json = await sendRequest(`/api/rounds/${params.id}`);
        
    setNewEdit(json)
    }
    fetchEdits()
    
},[] )

const handleEditRound = async (evt) => {
    evt.preventDefault();
    const response = await sendRequest(`/api/rounds/${params.id}`,'PUT', 
    (newEdit),
);
navigate('/rounds'); 
}

function handleChange(evt) {
    setNewEdit({...newEdit, [evt.target.name]: evt.target.value})
  };
  
return (
    <>
   { newEdit &&   ( <form onSubmit={handleEditRound}> 
  <label typeof="name">Edit Round</label>
    <input
      name="name"
      type="text"
      placeholder="Enter Course Name"
      value={newEdit.name}
      onChange={handleChange} />

      <label typeof="name">Score</label>
      <input
       name="score"
        type="Number"
        placeholder="Score"
        value={newEdit.score}
        onChange={handleChange} />
        

        <label typeof="numberOfPutts">Total Putts</label>
      <input
        name="numberOfPutts"
        type="Number"
        placeholder="Number of Putts"
        value={newEdit.numberOfPutts}
        onChange={handleChange} />
        

        <label typeof="numberOfFairways">Total Fairways Hit</label>
      <input
        name="numberOfFairways"
        type="Number"
        placeholder="Number of Fairways"
        value={newEdit.numberOfFairways}
        onChange={handleChange} />
        

        <label typeof="date">Date of Round</label>
      <input
        name="date"
        type="Date"
        placeholder="Date of Round"
        value={newEdit.date}

      onChange={handleChange}
       />
       <button
        onClick={handleEditRound}
        className="save-button">Save Edit
        </button> 
    </form>)
  }        
   </>
)
}
