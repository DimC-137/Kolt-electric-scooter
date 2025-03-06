import { useEffect } from 'react';
import '../Comp_Styles/Audio.scss';
import song from "../Audio/Darude_Sandstorm.mp3";

const audio = new Audio(song);

export default function Player({ glow, setGlow }) {

    const playPause = () => {
        if (glow) {
            audio.pause();
        } else {
            audio.play();
        }
        setGlow(!glow);
        audio.volume = 0.5;
    };

    const changeVolume = (e) => {
        audio.volume = e.target.value;
    };

    useEffect(() => {
        const handleAudioEnd = () => {
            setGlow(false);
        };

        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, []);

    useEffect(() => {
        return () => {
            audio.pause();
        };
    }, []);

    return (
        <>
            <div className='darude'>
                <div>
                    {glow ?
                        <div>Sandstorm is <span className="pla">Playing</span></div> :
                        <div>Sandstorm is <span className="paus">Paused</span></div>
                    }
                </div>
                <input
                    type="range"
                    onChange={changeVolume}
                    min={0}
                    max={1}
                    step={0.1}
                    defaultValue={0.5}
                />
                <button
                    className={`audio-button ${glow}`}
                    onClick={playPause}
                >
                    {glow ? 'Pause' : 'Play'}
                </button>
            </div>
            <div className={`glow${glow}`} />
        </>
    );
};
