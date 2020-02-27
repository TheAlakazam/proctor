import React, { Component } from 'react'
import Timer  from 'react-compound-timer';
export class TimerCountDown extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid m-0 p-4">
                <div className="container">
                    <h4>Time Left:</h4>
                    <h1 className="display-4">
                        <Timer
                            initialTime={10800000}
                            direction="backward"
                        >
                            {
                                () => (
                                    <React.Fragment>
                                        <Timer.Hours/>:
                                        <Timer.Minutes/>:
                                        <Timer.Seconds/>
                                    </React.Fragment>
                                )
                            }
                        </Timer>
                    </h1>
                </div>
            </div>
        )
    }
}

export default TimerCountDown;
