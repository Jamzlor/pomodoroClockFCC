import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

// var mise en place
var breakMinutes = 5;
var sessionMinutes = 25;
var displaySeconds = 0;



class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            breakLength: breakMinutes,
            sessionLength: sessionMinutes,
            play: false,
            sessionTimer: true,
            minutesLeft: sessionMinutes,
            secondsLeft: displaySeconds
        }
        this.handleReset = this.handleReset.bind(this)
        this.handleBreakLength = this.handleBreakLength.bind(this)
        this.handleSessionLength = this.handleSessionLength.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        // this.handlePause = this.handlePause.bind(this)
        this.timer = this.timer.bind(this)
    }
    
    handleReset(){
        breakMinutes = 5;
        sessionMinutes = 25;
        displaySeconds = 0;
        this.setState(state=>({
            breakLength: breakMinutes + ":00",
            sessionLength: sessionMinutes + ":00",
            timerState: false,
            sessionTimer: true,
            minutesLeft: sessionMinutes,
            secondsLeft: displaySeconds
        }));
    }
    
    handleBreakLength(e){
        if(e.target.id === "break-increment"){
            breakMinutes ++;
        } else {
            breakMinutes --;
        }
        this.setState(state=>({
            breakLength: breakMinutes + ":00",
            minutesLeft: sessionMinutes
        }));
    }
    
    handleSessionLength(e){
        if(e.target.id === "session-increment"){
            sessionMinutes ++;
        } else {
            sessionMinutes --;
        }
        this.setState(state=>({
            sessionLength: sessionMinutes + ":00",
            minutesLeft: sessionMinutes
        }));
    }
    
    handlePlay(){
        let countDown = setInterval(this.timer, 1000)
    }

    

    timer(){  
        this.state.secondsLeft > 0 ? this.setState(state=>({
                 secondsLeft : state.secondsLeft-1
            })) : this.setState(state=>({
                minutesLeft : state.minutesLeft - 1,
                secondsLeft : state.secondsLeft + 59
            }))                  
    }
    
    

    render(){
        return(
            <div id="wrapper">
                <Title />
                <LengthSelectors breakLength={this.handleBreakLength}
                sessionLength={this.handleSessionLength}
                break={this.state.breakLength} 
                session={this.state.sessionLength} />
                <Timer minutesLeft={this.state.minutesLeft}
                secondsLeft={this.state.secondsLeft} />
                <Controls 
                timerState={this.state.timerState}
                playButton={this.handlePlay}
                reset={this.handleReset} />
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
                <p id="break-length">{props.break}</p>
            </div>
            <div className="blockSpacing flex-container" id="session-label">
                <label className="buttonSpacing" onClick={props.sessionLength} id="session-decrement">&lt;</label>
                <h2> Session Length </h2>                    
                <label className="buttonSpacing" onClick={props.sessionLength} id="session-increment">&gt;</label>
                <p id="session-length">{props.session}</p>
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
            <label className="controlsSpacing playPause" id="start_stop" onClick={!props.timerState ? props.playButton : props.pauseButton} >
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