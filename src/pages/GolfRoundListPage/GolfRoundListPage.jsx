import React, { useEffect, useState } from "react";

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
            <p key={round._id}>
            {round.name} {round.score} {round.numberOfPutts}
            {round.numberOfFairways} {round.date}
            </p>
          ))
        ) : (
          
          <p>View Your Rounds Here </p>
        )}
      </div>
    </>
  );
}

