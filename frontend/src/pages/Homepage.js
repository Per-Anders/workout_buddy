import React, { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Homepage = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const getWorkouts = async () => {
    const { data } = await axios.get("http://localhost:8000/api/workouts", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({ type: "SET_WORKOUTS", payload: data });
  };

  useEffect(() => {
    if (user) {
      getWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Homepage;
