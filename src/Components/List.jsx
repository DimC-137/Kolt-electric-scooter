import '../Comp_Styles/List.scss';
import { useState, useEffect, useRef } from 'react';
import Edit from './Edit.jsx';

export default function List({ kolts, setKolts, glow }) {

    let stack = useRef(599);
    let shuffle = useRef(10);
    let [sortedD, setSortedD] = useState(false);
    let [sortedM, setSortedM] = useState(false);
    const [temp, setTemp] = useState([]);
    const [close, setClose] = useState(true);

    const deleteKolt = e => {
        setKolts(k => k = [...k.filter((el) => el.id != e.target.id)]);
    }

    const editKolt = e => {
        setClose(c => !c);
        setTemp(t => t = [...kolts.filter(el => el.id == e.target.id)]);
    }

    const sortByMileage = _ => {
        if (sortedM) {
            setKolts(k => [...k.toSorted((a, b) => a.totalRideKilometers - b.totalRideKilometers)]);
            setSortedM(s => !s);
        } else {
            setKolts(k => [...k.toSorted((a, b) => a.id - b.id)]);
            setSortedM(s => !s);
        }
    };

    const sortByDate = _ => {
        if (sortedD) {
            setKolts(k => [...k.toSorted((a, b) => new Date(a.lastUseTime) - new Date(b.lastUseTime))]);
            setSortedD(s => !s);
        } else {
            setKolts(k => [...k.toSorted((a, b) => a.id - b.id)]);
            setSortedD(s => !s);
        }
    };

    useEffect(_ => {
        const koltJSON = JSON.stringify(kolts);
        localStorage.setItem("kolt", koltJSON);
    }, [kolts, sortedM, sortedD]);

    return (
        <>
            {
                kolts.map((k, i) => (
                    <div className="kolt-container" style={{ zIndex: stack.current - i, top: -10 - shuffle.current * i + 'px' }} key={i}>
                        <div className="kolt-info">
                            <div>
                                <div className="title-name">ID:</div>
                                <div className='title-editables'>{k.id}</div>
                            </div>
                            <div>
                                <div className="title-name">Reg. code:</div>
                                <div className='title-editables reg'>{k.registrationCode}</div>
                            </div>
                            <div>
                                <div className="title-name">Status:</div>
                                <div className='title-editables'>{k.isBusy ? <div className='busy' /> : <div className='free' />}</div>
                            </div>
                            <div>
                                <div className="title-name">Last used:</div>
                                <div className='title-editables'>{k.lastUseTime}</div>
                            </div>
                            <div>
                                <div className="title-name">Mileage:</div>
                                <div className='title-editables'>{k.totalRideKilometers} km.</div>
                            </div>
                            <a className='kolt-add' id={k.id} onClick={editKolt}>Edit</a>
                            <a className='kolt-delete' id={k.id} onClick={deleteKolt}>Delete</a>
                        </div>
                    </div>
                ))
            }
            <div className='stats' style={{ top: -10 - shuffle.current * kolts.length + 'px' }}>
                <a className={sortedM ? 'sort-mile' : 'sort-id'} onClick={sortByMileage}>Sort by {sortedM ? 'Mileage' : 'ID'}</a>
                <div className='stats-title'>Total mileage: {kolts.reduce((acc, val) => acc + val.totalRideKilometers, 0)} km.</div>
                <div className='stats-title'>Scooters in total: {kolts.length}</div>
                <a className={sortedD ? 'sort-date' : 'sort-id2'} onClick={sortByDate}>Sort by {sortedD ? 'Date' : 'ID'}</a>
            </div >
            {temp.length > 0 ? <Edit close={close} setClose={setClose} kolts={kolts} setKolts={setKolts} temp={temp} setTemp={setTemp} glow={glow} style={{ visibility: close ? 'collapse' : 'visible' }} /> : null}
        </>
    );
}