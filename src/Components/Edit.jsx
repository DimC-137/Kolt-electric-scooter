import { useEffect, useState } from 'react';
import '../Comp_Styles/Edit.scss';

export default function Edit({ style, glow, kolts, setKolts, temp, setTemp, setClose }) {

    const closeModal = _ => {
        setClose(c => !c);
    }

    const changeDate = e => {
        setTemp(t => {
            const newTemp = [...t];
            newTemp[0] = { ...newTemp[0], lastUseTime: e.target.value }
            return newTemp;
        });
    }

    const changeMiles = e => {
        setTemp(t => {
            const newTemp = [...t];
            newTemp[0] = { ...newTemp[0], totalRideKilometers: parseFloat(e.target.value) };
            return newTemp;
        });
    }

    const changeStatus = e => {
        setTemp(t => {
            const newTemp = [...t];
            newTemp[0] = { ...newTemp[0], isBusy: e.target.checked };
            return newTemp;
        });
    }

    const saveModal = _ => {

        const selectedDate = new Date(temp[0].lastUseTime);
        const lastUseTime = new Date(kolts.filter((el) => el.id === temp[0].id)[0].lastUseTime);

        const thirtyDaysAgo = new Date(lastUseTime);
        thirtyDaysAgo.setDate(lastUseTime.getDate() - 30);

        if (selectedDate < thirtyDaysAgo) {
            setTemp(t => {
                const newTemp = [...kolts.filter((el) => el.id === temp[0].id)];
                newTemp[0] = { ...newTemp[0], alert: "Date is too old!" };
                return newTemp;
            });
            return;
        }

        if (kolts.filter((el) => el.id === temp[0].id)[0].totalRideKilometers > temp[0].totalRideKilometers) {
            setTemp(t => {
                const newTemp = [...kolts.filter((el) => el.id === temp[0].id)];
                newTemp[0] = { ...newTemp[0], alert: "You can't roll back mileage!" };
                return newTemp;
            });
            return;
        } else {
            setClose(c => !c);
            setTemp(t => {
                const newTemp = [...t];
                newTemp[0] = { ...newTemp[0], alert: null };
                return newTemp;
            })
            setKolts(k => [...k.filter((el) => el.id !== temp[0].id), temp[0]].toSorted((a, b) => a.id - b.id), temp[0].alert = null);
        }
    };

    return (
        <>
            <div style={style} className="edit-container">
                <div className='edit-bin'>
                    <fieldset className='edit-fieldset'>
                        <div className='edit1c'>
                            <div className='edit-id'>
                                <div>ID:</div>
                            </div>
                            <div className='edit-rc'>
                                <div>Reg. code:</div>
                            </div>
                            <div className='edit-check'>
                                <div>Status:</div>
                            </div>
                            <div className='edit-date'>
                                <div>Last used:</div>
                            </div>
                            <div className='edit-mileage'>
                                <div>Mileage:</div>
                            </div>
                        </div>
                        <div className='edit2c'>
                            <div>{temp[0].id}</div>
                            <div className='regc'>{temp[0].registrationCode}</div>
                            <div className='switch-div'><input type="checkbox" checked={temp[0].isBusy} onChange={changeStatus} /><div className={temp[0].isBusy ? "switchOff" : "switchOn"}><div className='ball' /></div></div>
                            <div>{temp[0].lastUseTime}</div>
                            <div>{temp[0].totalRideKilometers} km.</div>
                        </div>
                        <div className='edit3c'>
                            <div className={glow ? 'gloput1' : 'in1'} />
                            <div className={glow ? 'gloput2' : 'in2'} />
                            <div className={glow ? 'gloput3' : 'in3'} />
                            <div><input type="date" name="date" onChange={changeDate} value={temp[0].lastUseTime} /></div>
                            <div><input type='number' onChange={changeMiles} value={temp[0].totalRideKilometers} /></div>
                        </div>
                        <div>
                            <a className='kolt-save' onClick={saveModal}>
                                Save
                            </a>
                            <a className='kolt-close' onClick={closeModal}>
                                Close
                            </a>
                        </div>
                    </fieldset>
                </div>
                <div className={glow ? 'glowtrue2' : 'glowfalse2'} />
                {temp[0].alert ? <div className='alert'>{temp[0].alert}</div> : null}
            </div>
        </>
    );
}
