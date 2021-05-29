import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Home = () => {
    const { heroCont, setHeroCont } = useContext(UserContext);
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
    }

    return (
        <Fragment>
            {
                heroCont == 0 ?


                    (
                        <div className="py-5 text-center container">
                            <div className="row py-lg-5">
                                <div className="col-lg-6 col-md-8 mx-auto">
                                    <h1 className="text-white">Equipo de Heroes</h1>
                                    <p className="lead text-white">Crea tu propio equipo de heroes y villanos. En el conoceras el tipo de equipo que tienes, ademas la sumatoria de poderes de sus personajes. Para crear tu equipo debes dirigirte a la seccion buscar Heroes. ¿Empezamos?</p>
                                    <p>
                                        <Link to="Search" className="btn btn-primary my-2">Buscar Heroes</Link>
                                    </p>
                                </div>
                            </div>
                        </div>) :




                    (
                        <Fragment>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 mx-auto text-center">
                                    <h4 className="lead text-white">Acumulado de poderes</h4>
                                </div>
                            </div>

                            <div className="text-white text-center">
                                Combate: <span className="span text-primary">{powers[0]}</span> &nbsp; Durabilidad: <span className="span text-primary">{powers[1]}</span> &nbsp; Inetligencia: <span className="span text-primary">{powers[2]}</span> &nbsp; Fuerza: <span className="span text-primary">{powers[3]}</span> &nbsp; Velocidad: <span className="span text-primary">{powers[4]}</span>  &nbsp; Poder: <span className="span text-primary"> {powers[5]}</span>
                                <h4 className="text-white">Tipo de Equipo: <span className="text-primary h1">{tipo}</span></h4>
                            </div>

                            <div className="album py-3">
                                <div className="home-container">

                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                        {
                                            heroCont.map((h) => (

                                                <div className="col" key={h.id}>

                                                    <div className="card shadow-sm">

                                                        <div className="overflow">
                                                            <img src={h.image.url} className="card-img-top" alt="..." />
                                                        </div>

                                                        <div className="card-body justify-content-center">
                                                            <h3 className="card-title text-center "><b>{h.name}</b></h3>
                                                            <div className="row">
                                                                <div className="col-md-4 col-lg-4">
                                                                    <b>Poderes:</b>
                                                                </div>
                                                                <div className="col-sm col-md">
                                                                    <ul>
                                                                        <li className="card-text">Combate: <b>{h.powerstats.combat}</b></li>
                                                                        <li className="card-text">Durabilidad: <b>{h.powerstats.durability}</b></li>
                                                                        <li className="card-text">Inteligencia:<b>{h.powerstats.intelligence}</b> </li>
                                                                        <li className="card-text">Fuerza:<b>{h.powerstats.strength}</b> </li>
                                                                        <li className="card-text">Velocidad: <b>{h.powerstats.speed}</b></li>
                                                                        <li className="card-text">Poders: <b>{h.powerstats.power}</b></li>
                                                                    </ul>
                                                                </div>

                                                            </div>
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <div className="btn-group">
                                                                    <Link className="btn btn-primary" to={`/hero/${h.id}`}> +Más</Link>
                                                                    <button className="btn btn-danger" onClick={() => { hadleDelete(h.id) }}>Quitar</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>))
                                        }
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    )
}

