import React from "react";
import { minutesToDuration } from "../utils/duration";

const DurationBtns = ({
  handleDuration,
  breakDuration,
  focusDuration,
  session,
}) => {
  return (
    <React.Fragment>
      <div className="col">
        {/* Focus Duration */}
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              disabled={session}
              onClick={handleDuration}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              disabled={session}
              onClick={handleDuration}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      {/* Break DUration */}
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                disabled={session}
                onClick={handleDuration}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                disabled={session}
                onClick={handleDuration}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DurationBtns;
