import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GolfRoundListPage() {
  const [rounds, setRounds] = useState([]);
  const [newRound, setNewRound] = useState ({
   name: "",
   score: 0,
   numberOfPutts: 0,
   numberOfFairways: 0,
   date: ""
  }); 
  

  useEffect(() => {
    const fetchRounds = async () => {
      const response = await fetch("/api/rounds");
      const json = await response.json();

      if (response.ok) {
        setRounds(json);
      }
    };

    fetchRounds();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await fetch('/api/rounds', {method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(newRound)

  })

  const newRoundObj = await response.json();
    

      setRounds([...rounds, newRoundObj]);
      setNewRound({
        name: "",
        score: 0,
        numberOfPutts: 0,
        numberOfFairways: 0,
        date: ""
       });
    

  };


  function handleChange(evt) {
    setNewRound({...newRound, [evt.target.name]: evt.target.value})
  };

  const handleDeleteRound =  (roundID) => {
    const response = fetch(`/api/rounds/${roundID}`, {method: 'DELETE'})
    .then(() => this.setState({ status: 'Delete successful' }));

    const removeRound = rounds.filter((round) => round._id !== roundID);
    setRounds(removeRound);
  }

  const handleEditRound = (roundID) => {
    const response = fetch(`/api/rounds/${roundID}`, {method: 'PUT'})
     

    const editRound = rounds.filter((round) => round._id == roundID);
    setRounds(editRound);
  }

  



  return (
    <>
    <h1>My Rounds Of Golf</h1>
      <form onSubmit={handleSubmit}> 
      <label typeof="name">Name of Course</label>
        <input
          name="name"
          type="text"
          placeholder="Enter Course Name"
          value={newRound.name}
          onChange={handleChange} />
        

        <label typeof="name">Score</label>
        <input
        name="score"
          type="Number"
          placeholder="Score"
          value={newRound.score}
          onChange={handleChange} />
          

          <label typeof="numberOfPutts">Total Putts</label>
        <input
          name="numberOfPutts"
          type="Number"
          placeholder="Number of Putts"
          value={newRound.numberOfPutts}
          onChange={handleChange} />
          

          <label typeof="numberOfFairways">Total Fairways Hit</label>
        <input
          name="numberOfFairways"
          type="Number"
          placeholder="Number of Fairways"
          value={newRound.numberOfFairways}
          onChange={handleChange} />
          

          <label typeof="date">Date of Round</label>
        <input
          name="date"
          type="Date"
          placeholder="Date of Round"
          value={newRound.date}
          onChange={handleChange} />
          
         <button type="submit">Add Rounds</button> 

      </form>
      <div className="rounds">
        {rounds.length !== 0 ? (
          rounds.map((round) => (
            
          
              <div
                key={round._id} >
            <strong>Name of Course:</strong> &nbsp;{round.name}
            
            <strong>Score:</strong>&nbsp;{round.score}
            &nbsp; | &nbsp;
            <strong>Total Putts:</strong>&nbsp;{round.numberOfPutts}
            &nbsp; | &nbsp;
             <strong>Total Fairways Hit:</strong>&nbsp;{round.numberOfFairways} 
             &nbsp; | &nbsp;
             <strong>Date of Round:</strong>&nbsp;{round.date}
             &nbsp; | &nbsp;
             <button
                onClick={() => handleDeleteRound(round._id)}
                className="delete-button">Delete Round
              </button> 
              <button onClick={() => handleEditRound(round._id)} className="edit-button">
              <Link to={`/rounds/${round._id}/edit`}>Edit Round</Link>
              </button>

   
                
            </div>
            
            
          ))
        ) : (
          
          <p>View Your Rounds Here </p>
        )}
      </div>
    </>
  );
}

