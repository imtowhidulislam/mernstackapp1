import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import GlobalUser from "../components/globalUser";
const postUrl = "http://localhost:3001/api/workout/create/";

const Form = () => {
  const [workoutInput, setWorkoutInput] = useState({
    title: "",
    reps: "",
    load: "",
  });
  const { user } = GlobalUser();
  const { userDB } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [display, setDisplay] = useState("block");
  const [toggle, setToggle] = useState(true);
  const [emptyFields, setEmptyFeilds] = useState([]);

  // ? Handle Change:::
  const handleChange = (e) => {
    const { name, value } = e.target;
    const workout = { ...workoutInput, [name]: value };
    setWorkoutInput(workout);
  };

  // !! HandleSubmit Function:::
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Your Must be Logged In");
    }
    if (workoutInput.title && workoutInput.reps && workoutInput.load) {
      const postRes = await fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(workoutInput),
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.token,
        },
      });
      const postData = await postRes.json();

      if (!postRes.ok) {
        setError(postData.error);
        setEmptyFeilds(postData.emptyFields);
      }
      if (postRes.ok) {
        setError(null);
        setSuccess("workout added successfully");
        // setEmptyFeilds([]);
        setWorkoutInput({ title: "", reps: "", load: "" });
      }
    } else {
      setError("Please fill in all the feilds");
    }
  };

  console.log(emptyFields);
  /*   setTimeout(() => {
    toggle ? setDisplay("hidden") : setDisplay("block");
  }, 4000); */
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="bg-[#f78f78] p-8 drop-shadow-lg rounded-lg w-80">
        <h2 className="text-xl font-bold text-blue-700 text-center uppercase mb-4">
          Add a new workout
        </h2>

        <form action="" onSubmit={handleSubmit} className="">
          <div className="mb-2">
            <label htmlFor="exceisize title">Excersize Title</label>
            <br />
            <input
              type="text"
              id="title"
              name="title"
              value={workoutInput.title}
              onChange={handleChange}
              placeholder="eg: plank"
              className="input_area"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="reps">Repetations</label>
            <br />
            <input
              type="text"
              id="reps"
              name="reps"
              value={workoutInput.reps}
              onChange={handleChange}
              placeholder="eg: 20"
              className="input_area"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="load">Load</label>
            <br />
            <input
              type="text"
              id="load"
              name="load"
              value={workoutInput.load}
              onChange={handleChange}
              placeholder="eg: 10kg"
              className="input_area"
            />
          </div>
          <div className="w-full grid place-items-center mt-8">
            <button
              onClick={() => setToggle(!toggle)}
              className="btn border-none outline-none bg-blue-800 text-gray-200 cursor-pointer text-base font-bold rounded-3xl py-2 px-6"
            >
              Add
            </button>
          </div>
        </form>
        {error && (
          <p
            className={`mt-2 uppercase font-light text-center text-red-600 font-sm `}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            className={`mt-2 uppercase font-light text-center text-green-600 text-sm`}
          >
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
