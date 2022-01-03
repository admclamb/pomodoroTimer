import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import DurationBtns from "./DurationBtns";
import PausePlayBtns from "./PausePlayBtns";
import SessionDisplay from "./SessionDisplay";
// These functions are defined outside of the component to ensure they do not have access to state
// and are, therefore, more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher-order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  // const focusDuration = 25;
  // const breakDuration = 5;
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You won't need to make changes to the callback function
   */
  const handleDuration = (event) => {
    // handles the button and the icon inside of the button so it will always get the testId to decide what to do
    let handleType = event.target.dataset.testid;
    if (handleType === undefined) {
      handleType = event.target.parentElement.dataset.testid;
    }
    let split = handleType.split("-");
    // checks if the focus/break duration will be within the allowed boundaries
    if (split[1] === "focus") {
      split[0] === "decrease"
        ? focusDuration > 5 && setFocusDuration(focusDuration - 5)
        : focusDuration < 60 && setFocusDuration(focusDuration + 5);
    } else if (split[1] === "break") {
      split[0] === "decrease"
        ? breakDuration > 1 && setBreakDuration(breakDuration - 1)
        : breakDuration < 15 && setBreakDuration(breakDuration + 1);
    }
  };

  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  const handleStop = () => {
    setIsTimerRunning(false);
    setSession(null);
    setFocusDuration(25);
    setBreakDuration(5);
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <DurationBtns
          handleDuration={handleDuration}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          session={session}
        />
      </div>
      <div className="row">
        <PausePlayBtns
          isTimerRunning={isTimerRunning}
          playPause={playPause}
          handleStop={handleStop}
          session={session}
        />
      </div>
      <div>
        <SessionDisplay
          session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          isTimerRunning={isTimerRunning}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
