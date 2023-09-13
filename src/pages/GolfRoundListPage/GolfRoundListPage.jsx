import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function GolfRoundListPage() {
  // Initialize state variables for storing golf rounds and a new golf round
  const [rounds, setRounds] = useState([]);
  const [newRound, setNewRound] = useState({
    name: "",
    score: 0,
    numberOfPutts: 0,
    numberOfFairways: 0,
    date: ""
  });

  // useEffect hook to perform an action when the component mounts 
  useEffect(() => {
    const fetchRounds = async () => {
      const json = await sendRequest("/api/rounds");
      // Update the 'rounds' state
      setRounds(json);

    };

    fetchRounds();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // Create a new golf round object by sending a POST request to the API endpoint
    const newRoundObj = await sendRequest('/api/rounds', 'POST',
      (newRound)

    )

    // Update the 'rounds' state
    // Reset the 'newRound' state to clear the form inputs
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
    setNewRound({ ...newRound, [evt.target.name]: evt.target.value })
  };

  const handleDeleteRound = (roundID) => {
    const response = sendRequest(`/api/rounds/${roundID}`, 'DELETE')


    const removeRound = rounds.filter((round) => round._id !== roundID);
    setRounds(removeRound);
  }

  const handleEditRound = (roundID) => {
    const response = sendRequest(`/api/rounds/${roundID}`, 'PUT')


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

