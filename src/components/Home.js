import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getHeroes, getVillains } from '../services/Axios';
//import { UserContext } from '../context/UserContext';
import { HerosAllScreen } from './heroes/HerosAllScreen';

export const Home = () => {

    const [list, setList] = useState([]);

    useEffect(() => {

        const setHeroes = async () => {
            let array = [];
            const hero = await getHeroes();
            const vill = await getVillains();
            array = [...hero.data.slice(0,10), ...vill.data.slice(0,10)];
            setList(array.sort());
        }

        setHeroes();
    }, [setList])




    /*const { heroCont, setHeroCont } = useContext(UserContext);
    const [tipo, setTipo] = useState('');
    const [powers, setPowers] = useState([])

    const calculo = () => {
        const powerS = heroCont.map(p => p.powerstats);

        const Combat = powerS.reduce((sum, value) => ((parseInt(value.combat) ? "null" : 0) ? sum + parseInt(value.combat) : sum), 0)
        const Durability = powerS.reduce((sum, value) => ((parseInt(value.durability) ? "null" : 0) ? sum + parseInt(value.durability) : sum), 0)
        const Intelligence = powerS.reduce((sum, value) => ((parseInt(value.intelligence) ? "null" : 0) ? sum + parseInt(value.intelligence) : sum), 0)
        const Strength = powerS.reduce((sum, value) => ((parseInt(value.strength) ? "null" : 0) ? sum + parseInt(value.strength) : sum), 0)
        const Speed = powerS.reduce((sum, value) => ((parseInt(value.speed) ? "null" : 0) ? sum + parseInt(value.speed) : sum), 0)
        const Power = powerS.reduce((sum, value) => ((parseInt(value.power) ? "null" : 0) ? sum + parseInt(value.power) : sum), 0)

        setPowers([Combat, Durability, Intelligence, Strength, Speed, Power]);

        let result = Math.max(Combat, Durability, Intelligence, Strength, Speed, Power);

        const Mayor = Combat == result ? "Combat" :
            Durability == result ? "Durability " :
                Intelligence == result ? "Intelligence" :
                    Strength == result ? "Strength" :
                        Speed == result ? "Speed" :
                            Power == result ? "Power" : null;
        setTipo(Mayor);
    }

    useEffect(() => {
        calculo();
    }, [heroCont])

    const hadleDelete = (id) => {
        const newArr = heroCont.filter((h) => h.id !== id);
        setHeroCont(newArr)
    }*/

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {
                    list.map((h) => (
                        <div className="col" key={h.id}>
                            <div className="card" style={{ marginBottom: '1em' }}>
                                <div className="container-img">
                                    <img src={h.images?.sm} className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{h.name} <span>({h.biography?.alignment})</span></h5>
                                    <div className="hero-data">
                                        <div className="more-info-container">
                                            <div className="info-block">
                                                <div className="info-block-label">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/brain.png`} alt='brain' />
                                                    <span>Inteligencia</span>
                                                </div>
                                                <div className="info-block-value">
                                                    {h.powerstats?.intelligence}
                                                </div>
                                            </div>

                                            <div className="info-block">
                                                <div className="info-block-label">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/strong.png`} alt='strong' />
                                                    <span>Fortaleza</span>
                                                </div>
                                                <div className="info-block-value">
                                                    {h.powerstats?.strength}
                                                </div>
                                            </div>

                                            <div className="info-block">
                                                <div className="info-block-label">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/speed.png`} alt='speed' />
                                                    <span>Velocidad</span>
                                                </div>
                                                <div className="info-block-value">
                                                    {h.powerstats?.speed}
                                                </div>
                                            </div>

                                            <div className="info-block">
                                                <div className="info-block-label">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/charge.png`} alt='charge' />
                                                    <span>Durabilidad</span>
                                                </div>
                                                <div className="info-block-value">
                                                    {h.powerstats?.durability}
                                                </div>
                                            </div>

                                            <div className="info-block">
                                                <div className="info-block-label">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/power.png`} alt='power' />
                                                    <span>Poder</span>
                                                </div>
                                                <div className="info-block-value">
                                                    {h.powerstats?.power}
                                                </div>
                                            </div>

                                            <div className="info-block">
                                                <div className="info-block-label">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/combat.png`} alt='combat' />
                                                    <span>Combate</span>
                                                </div>
                                                <div className="info-block-value">
                                                    {h.powerstats?.combat}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
