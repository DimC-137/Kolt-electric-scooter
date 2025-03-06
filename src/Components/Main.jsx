import '../Comp_Styles/Main.scss';
import { useRef, useState, useEffect, useContext } from 'react';
import randReg from "../Functions/randReg";
import List from './List'
import Player from './Audio';

export default function Main() {

    const id = useRef(localStorage.getItem("tempId") || 1);

    const [kolts, setKolts] = useState(JSON.parse(localStorage.getItem("kolt")) || []);

    const [glow, setGlow] = useState(false);

    const date = new Date().toJSON().slice(0, 10);

    const klt = {

        registrationCode: randReg(),
        isBusy: false,
        lastUseTime: date,
        totalRideKilometers: 0

    }

    const addKolt = _ => {
        const kolt = {
            ...klt,
            id: id.current++
        }
        setKolts(k => [...k, kolt])
        const koltJSON = JSON.stringify(kolts);
        localStorage.setItem("kolt", koltJSON);
        localStorage.setItem("tempId", id.current);
    }

    return (
        <>
            <div className="container">
                <div className="kolt-image">
                    <img src="src/Images/Kolt.svg" alt="Logo" />
                </div>
                <div className='k-title'><span>Kolt</span>electric scooters</div>
                <div className="kolt-info">
                    <div>
                        <div className="title-name">ID:</div>
                        <div className='title-editables'>{id.current}</div>
                    </div>
                    <div>
                        <div className="title-name">Reg. code:</div>
                        <div className='title-editables reg'>{klt.registrationCode}</div>
                    </div>
                    <div>
                        <div className="title-name">Status:</div>
                        <div className='title-editables'>{klt.isBusy ? <div className='busy' /> : <div className='free' />}</div>
                    </div>
                    <div>
                        <div className="title-name">Last used:</div>
                        <div className='title-editables'>{klt.lastUseTime}</div>
                    </div>
                    <div>
                        <div className="title-name">Mileage:</div>
                        <div className='title-editables'>{klt.totalRideKilometers}</div>
                    </div>
                    <a className='kolt-add' onClick={addKolt}>Add</a>
                </div>
            </div>
            <Player glow={glow} setGlow={setGlow} />
            <List glow={glow} kolts={kolts} setKolts={setKolts} id={id} />
        </>
    );
}