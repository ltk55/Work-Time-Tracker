import React, { useContext, useState } from "react";
import RestaurantFinder from "../api/AttDataFinder";
import { AttDataContext } from "../context/AttDataContext";

const AddAttData = () => {
  const { addAttData, attData } = useContext(AttDataContext);
  const [attDate, setAttDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lunchMin, setLunchMin] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RestaurantFinder.post("/", {
        att_date: attDate,
        start_time: startTime,
        end_time: endTime,
        lunch_min: lunchMin,
      });

      addAttData(response.data.data.attdata);

      //Remove submitted values
      setAttDate("");
      setStartTime("");
      setEndTime("");
      setLunchMin(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttDate = (date) => {
    if (
      attData.filter((e) => e.att_date.substring(0, 10) === date).length > 0
    ) {
      alert("Same date exists!");
      return;
    }
    setAttDate(date);
  };

  const handleStartTime = (time) => {
    if (time > endTime && endTime !== "") {
      alert("Start Time must be less than End Time");
      return;
    }
    setStartTime(time);
  };

  const handleEndTime = (time) => {
    if (time < startTime && startTime !== "") {
      alert("End Time must be greater than Start Time");
      return;
    }
    setEndTime(time);
  };

  return (
    <form action="" className="">
      <div className="row mb-5">
        <div className="col-md-3 align-self-end mb-3">
          <label htmlFor="date" className="form-label text-light">
            Date
          </label>
          <input
            value={attDate}
            onChange={(e) => handleAttDate(e.target.value)}
            type="date"
            className="form-control text-center"
            placeholder="YYYYMMDD"
          />
        </div>
        <div className="col-md-3 align-self-end mb-3">
          <label htmlFor="start-time" className="form-label text-light">
            Start Time
          </label>
          <input
            value={startTime}
            onChange={(e) => handleStartTime(e.target.value)}
            type="time"
            className="form-control text-center"
            placeholder="HH:MM"
          />
        </div>
        <div className="col-md-3 align-self-end mb-3">
          <label htmlFor="end-time" className="form-label text-light">
            End Time
          </label>
          <input
            value={endTime}
            onChange={(e) => handleEndTime(e.target.value)}
            type="time"
            className="form-control text-center"
            placeholder="HH:MM"
          />
        </div>
        <div className="col-md-2 align-self-end mb-3">
          <label htmlFor="lunch-time" className="form-label text-light">
            Lunch Duration (min)
          </label>
          <input
            value={lunchMin}
            onChange={(e) => setLunchMin(e.target.value)}
            type="number"
            min="0"
            step="1"
            className="form-control text-center"
            placeholder="MM"
          />
        </div>
        <div className="col-md-1 align-self-end mb-3">
          <button onClick={handleSubmit} className="btn btn-primary ">
            <span className="bg-primary">Submit</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddAttData;
