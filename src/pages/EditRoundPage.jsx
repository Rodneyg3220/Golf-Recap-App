import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'

export default function EditRoundPage() {
  const[edits, setEdits] = useState([])
  const[newEdit, setNewEdit] = useEffect([])
  const params = useParams()

useEffect(() => {
    const fetchEdits = async () => {
        const response = await fetch(`/api/rounds/${params.id}`);
        const json = await response.json();
    
        if (response.ok) {
        setEdits(json)
        }
    }
    
    fetchEdits()
    
},[] )

const handleEditRound = async (evt) => {
    evt.preventDefault();
    const response = await fetch(`/api/rounds/${params.id}`, {method: 'PUT', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(newEdit)


  })}
 


    return (

        <form onSubmit={handleEditRound}> 
      <label typeof="name">Edit Round</label>
        <input
          name="name"
          type="text"
          placeholder="Enter Course Name"
          value={newEdit.name}
          onChange={handleChange} />
        </form>
           
       
    )
    }

