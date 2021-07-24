import React, { useState } from 'react'
import DisplayComponent from './components/DisplayComponent';
import BtnComponent from './components/BtnComponent';
import Secundomer from './Secundomer/Secundomer';
import './App.css';

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // paus = 2


  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedH++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const restart = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const resume = () => start();

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-warning text-center">SecondNumber</h1>
      <p className="text-center text-primary fs-5">Yuldashoff_M</p>
      <div className="main-section">
        <div className="clock-holder shadow">
          <div className="stopwatch">
            <Secundomer />
            <DisplayComponent time={time} />
            <BtnComponent status={status} resume={resume} restart={restart} stop={stop} start={start} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
