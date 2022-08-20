import React, { createContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import { useAuthContext } from "../hooks/useAuthContext";
import GlobalUser from "../components/globalUser";
const url = "http://localhost:3001/api/workout";
const deleteUrl = "http://localhost:3001/api/workout/";
export const workoutContext = createContext();

const Homepage = () => {
  const { user } = GlobalUser();
  // const user = JSON.parse(localStorage.getItem("userDB"));

  const [workout, setWorkout] = useState([]);
  // const { userDB } = useAuthContext();

  // ? Showing all the Workout???
  const fetchingWorkout = async () => {
    const res = await fetch(url, {
      headers: {
        "auth-token": user.token,
      },
    });
    const workoutData = await res.json();

    setWorkout(workoutData);
  };
  //   !! Delete Workout:::
  const deleteWorkout = async (_id) => {
    console.log(_id);
    // const user = JSON.parse(localStorage.getItem("userDB"));

    const res = await fetch(`http://localhost:3001/api/workout/${_id}`, {
      method: "DELETE",
      headers: {
        "auth-token": user.token,
      },
    });
    const deleteData = await res.json();
    if (res.ok) {
      console.log(`workout deleted successfully ${deleteData}`);
    }
    if (!res.ok) {
      console.log("something wrong with your request");
    }
  };
  useEffect(() => {
    if (user) {
      fetchingWorkout();
    }
  }, [workout]);
  return (
    <div className="text-2xl font-bold p-16">
      {workout &&
        workout.map((workouts) => {
          const { _id, title, reps, load, createdAt } = workouts;
          return (
            <div
              key={_id}
              className="relative bg-blue-300 w-full rounded-lg p-4 mb-6 flex items-center justify-between gap-2"
            >
              <div>
                <p className="capitalize font-light">{title}</p>
                <p className="text-sm text-gray-200 capitalize font-light">
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <h2>{reps}</h2>
              <h3 className="text-blue-500 font-bold capitalize text-lg">
                {load}
              </h3>
              <div className="absolute -top-5 left-1/2 translate-x-1/2 -translate-x-1/2 ">
                <button
                  onClick={() => deleteWorkout(_id)}
                  className="bg-blue-200 w-8 aspect-square rounded-full opacity-40 py-1 px-2 rounded-xl text-sm capitalize cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} size={"1x"} />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Homepage;
