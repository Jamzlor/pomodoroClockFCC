import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

//this function will convert the time from seconds to MM:SS format
function formattedTime(timeInSec) {
    var min = Math.floor((timeInSec % 3600) / 60);
    var sec = Math.floor(timeInSec % 60);

    var time = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    return time;
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            breakLength: 300,
            sessionLength: 1500,
            cycle: "Session",
            sound: "on",
            timeRunning: false
        };

        this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
        this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
        this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
        this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSessionIncrease() {
        this.setState(state => ({
            sessionLength : state.sessionLength + 60
        }));
    }

    handleSessionDecrease() {
        this.setState(state => ({
            sessionLength : state.sessionLength - 60
        }));
    }

    handleBreakIncrease() {
        this.setState(state => ({
            breakLength : state.breakLength + 60
        }));
    }

    handleBreakDecrease() {
        this.setState(state => ({
            breakLength : state.breakLength - 60
        }));
    }

    handleReset() {
        this.setState(state => ({
            breakLength: 300,
            sessionLength: 1500,
            cycle: "Session",
            sound: "on",
            timeRunning: false
        }));
    }

    // TODO:  playPause function to be added here
    playPause() {
        this.setState(state => ({

        }))
    }
    
    render(){
        return(
            <div id="wrapper">
                <Title />
                <LengthSelectors 
                sessionIncrease={this.handleSessionIncrease}
                sessionDecrease={this.handleSessionDecrease}
                breakIncrease={this.handleBreakIncrease}
                breakDecrease={this.handleBreakDecrease}
                break={this.state.breakLength} 
                session={this.state.sessionLength} />
                <Timer minutesLeft={this.state.cycle === "Session" ? this.state.sessionLength : this.state.breakLength}
                secondsLeft={this.state.secondsLeft} />
                <Controls reset={this.handleReset}  />
                <Footer />
            </div>
        );
    }
    }

// components
const Title = () =>{
    return(
        <span id="title">Pomodoro Clock</span>
    );
}

const LengthSelectors = (props) =>{
    return(
        <div className="flex-container" id="lengthSelectors">
            <div className="blockSpacing flex-container" id="break-label">
                <label className="buttonSpacing" onClick={props.breakDecrease} id="break-decrement">&lt;</label>
                <h2> Break Length </h2>
                <label className="buttonSpacing" onClick={props.breakIncrease} id="break-increment">&gt;</label>
                <p id="break-length">{formattedTime(props.break)}</p>
            </div>
            <div className="blockSpacing flex-container" id="session-label">
                <label className="buttonSpacing" onClick={props.sessionDecrease} id="session-decrement">&lt;</label>
                <h2> Session Length </h2>                    
                <label className="buttonSpacing" onClick={props.sessionIncrease} id="session-increment">&gt;</label>
                <p id="session-length">{formattedTime(props.session)}</p>
            </div>
        </div> 
    ) ;            
}

const Timer = (props) =>{
    return (
        <div id="timer-label" className="flex-container">
            <p id="time-left">{formattedTime(props.minutesLeft)}</p>
        </div>
    );
}

const Controls = (props) => {
    return (
        <div className="flex-container " id="controls">
            <label className="controlsSpacing playPause" id="start_stop" >
                <i className="fa fa-play"/>
                <i className="fa fa-pause"/>
            </label>
            <label className="controlsSpacing" id="reset" onClick={props.reset}>Reset</label>
        </div>
    );
}

const Footer = () => {
    return(
        <div id="footer">
            <h4>Created and Coded by James Lo</h4>
        </div>
    )
}

var targetNode = document.getElementById("root");
ReactDOM.render(<App />, targetNode)