import React, { Component } from "react";
import '../Comp_Styles/Audio.scss';
import song from "../Audio/Darude_Sandstorm.mp3";

class Player extends Component {

    state = {

        audio: new Audio(song),
        isPlaying: false,

    };

    playPause = () => {

        let isPlaying = this.state.isPlaying;

        if (isPlaying) {
            this.state.audio.pause();
        } else {
            this.state.audio.play();
        }

        this.setState({ isPlaying: !isPlaying });
        this.state.audio.volume = 0.5;
    };

    changeVolume = e => {
        this.state.audio.volume = e.target.value;
    }

    render() {
        return (<>
            <div className='darude'>
                <div>
                    {this.state.isPlaying ?
                        <div>Sandstorm is <span className="pla">Playing</span></div> :
                        <div>Sandstorm is <span className="paus">Paused</span></div>}
                </div>
                <input type="range" onChange={this.changeVolume} min={0} max={1} step={0.1} />
                <button className={`audio-button ${this.state.isPlaying}`} onClick={this.playPause}>
                    {this.state.isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
            <div className={`glow${this.state.isPlaying}`} />
        </>
        );
    }

}

export default Player;


