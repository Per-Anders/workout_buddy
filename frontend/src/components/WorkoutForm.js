import React, { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = {
      title,
      load,
      reps,
    };

    const response = await axios
      .post("http://localhost:8000/api/workouts/", workout, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((error) => {
        console.log(response.emptyFields);
      });
    dispatch({ type: "CREATE_WORKOUT", payload: response.data });

    setTitle("");
    setReps("");
    setLoad("");
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Exercise title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />
        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button>Add workout</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
