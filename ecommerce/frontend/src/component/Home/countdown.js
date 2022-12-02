import React, { Fragment } from 'react'

const Countdown = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
    return (
        <Fragment>
            <div>
                <div>
                    <p>{timerDays}</p>
                    <small>Dias</small>
                </div>{" "}
                <div>
                    <p>{timerHours}</p>
                    <small>HRs</small>
                </div>{" "}
                <div>
                    <p>{timerMinutes}</p>
                    <small>Min.</small>
                </div>
                <div>
                    <p>{timerSeconds}</p>
                    <small>Seg.</small>
                </div>
            </div>
        </Fragment>
    );
};

Countdown.defaultProps = {
    timerDays: 10,
    timerHours: 10,
    timerMinutes: 10,
    timerSeconds: 10,
  };

export default Countdown