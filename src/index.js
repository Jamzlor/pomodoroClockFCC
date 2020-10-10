import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            cycle: "Session",
            sound: "on",
            secondsLeft: 0
        }
    }

    render(){
        return(
            <div id="wrapper">
                <Title />
                <LengthSelectors 
                break={this.state.breakLength} 
                session={this.state.sessionLength} />
                <Timer minutesLeft={this.state.sessionLength}
                secondsLeft={this.state.secondsLeft} />
                <Controls />
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
                <label className="buttonSpacing" onClick={props.breakLength} id="break-decrement">&lt;</label>
                <h2> Break Length </h2>
                <label className="buttonSpacing" onClick={props.breakLength} id="break-increment">&gt;</label>
                <p id="break-length">{props.break + ":00"}</p>
            </div>
            <div className="blockSpacing flex-container" id="session-label">
                <label className="buttonSpacing" onClick={props.sessionLength} id="session-decrement">&lt;</label>
                <h2> Session Length </h2>                    
                <label className="buttonSpacing" onClick={props.sessionLength} id="session-increment">&gt;</label>
                <p id="session-length">{props.session + ":00"}</p>
            </div>
        </div> 
    ) ;            
}

const Timer = (props) =>{
    return (
        <div id="timer-label" className="flex-container">
            <p id="time-left">{props.minutesLeft + ":" + ("0" + props.secondsLeft).slice(-2)}</p>
        </div>
    );
}

const Controls = (props) => {
    return (
        <div className="flex-container " id="controls">
            <label className="controlsSpacing playPause" id="start_stop">
                <i className="fa fa-play"/>
                <i className="fa fa-pause"/>
            </label>
            <label className="controlsSpacing" id="reset">Reset</label>
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