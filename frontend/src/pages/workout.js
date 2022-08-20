import React, { useContext } from "react";
import { workoutContext } from "./homePage";

const Workout = () => {
  const { workout, setWorkout, _id, title, reps, load, deleteWorkout } =
    useContext(workoutContext);
  const deleteWorkout1 = (_id) => {
    console.log("delete workout");
    console.log(_id);
    const findWorkout = workout.filter((work) => work._id !== _id);
    setWorkout(findWorkout);
  };
  return (
    <div
      key={_id}
      className="relative bg-gray-300 w-full rounded-lg p-4 mb-6 flex items-center justify-between gap-2"
    >
      <p className="capitalize font-light">{title}</p>
      <h2 className="border-2 border-cyan-600 text-green-400">{reps}</h2>
      <h3 className="text-gray-500 font-bold capitalize text-lg">{load}</h3>
      <div className="absolute -top-5 left-1/2 translate-x-1/2 -translate-x-1/2 ">
        <button
          onClick={deleteWorkout(_id)}
          className="bg-blue-400 py-1 px-2 rounded-xl text-sm capitalize cursor-pointer"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Workout;
