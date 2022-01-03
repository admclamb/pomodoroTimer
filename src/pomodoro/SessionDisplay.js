import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

const SessionHeader = ({ session, focusDuration, breakDuration }) => {
  if (session.label === "Focusing") {
    return (
      <h2>
        {session?.label} for {minutesToDuration(focusDuration)} minutes
      </h2>
    );
  } else {
    return (
      <h2>
        {session?.label} for {minutesToDuration(breakDuration)} minutes
      </h2>
    );
  }
};

const TimeRemaining = ({ session }) => {
  return (
    <p className="lead" data-testid="session-sub-title">
      {secondsToDuration(session?.timeRemaining)} remaining
    </p>
  );
};

const IsPaused = ({ session, isTimerRunning }) => {
  return session && !isTimerRunning && <h4>Paused</h4>;
};

const ProgressBar = ({ session, focusDuration, breakDuration }) => {
  const calculatePercentage = (num1, num2) => {
    return 1 - num1 / (num2 * 60);
  };
  console.log(calculatePercentage(session.timeRemaining, focusDuration) + "%");
  if (session.label === "Focusing") {
    return (
      <div className="progress" style={{ height: "20px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={
            calculatePercentage(session.timeRemaining, focusDuration) * 100
          }
          style={{
            width:
              calculatePercentage(session.timeRemaining, focusDuration) + "%",
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="progress" style={{ height: "20px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={
            calculatePercentage(session.timeRemaining, breakDuration) * 100
          }
          style={{
            width:
              calculatePercentage(session.timeRemaining, breakDuration) + "%",
          }}
        />
      </div>
    );
  }
};

const SessionDisplay = ({
  session,
  focusDuration,
  breakDuration,
  isTimerRunning,
}) => {
  return (
    session && (
      <React.Fragment>
        <div className="row mb-2">
          <div className="col">
            <SessionHeader
              session={session}
              focusDuration={focusDuration}
              breakDuration={breakDuration}
            />
            <TimeRemaining session={session} />
            <IsPaused session={session} isTimerRunning={isTimerRunning} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <ProgressBar
              session={session}
              focusDuration={focusDuration}
              breakDuration={breakDuration}
            />
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default SessionDisplay;
