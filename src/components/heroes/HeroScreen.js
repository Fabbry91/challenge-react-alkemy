import React, { useContext } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'


export const HeroScreen = () => {

    const { heroCont } = useContext(UserContext);

    const { heroId } = useParams();



    if (heroCont == 0) {
        return <Redirect to="/" />
    }

    if (!heroId) {
        return < Redirect to="/" />
    }

    const auxHero = heroCont.find(h => h.id === heroId);

    const { image, name, appearance, biography, work } = auxHero

    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative mt-4">
            <div className="col-md-5 col-lg-5">
                <div className="overflow" >
                    <img src={image.url} alt="..." className="card-img-top" />
                </div>
                <Link className="d-grid gap-2 btn btn-danger mt-2" to="/">Regresar</Link>
            </div>
            <div className="col d-flex flex-column position-static">
                <div className="card-body text-center">
                    <strong class="d-inline-block mb-2">Apariencia</strong>
                    <hr />
                    <h2 className="card-title">{name}</h2>
                    <div className="row">
                        <div className="col-md-6 col-lg-6">
                            Color de ojos: {/*appearance.eye-color*/}<br />
                        Genero: {appearance.gender} <br />
                            <h4>Altura</h4>
                            <ul>
                                {
                                    appearance.height.map((h, index) => (
                                        <li className="style-li" key={index}>{h}&nbsp;&nbsp;&nbsp;</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            Raza: {appearance.race}<br />
                        Color de cabello: {/*appearance.hair-color*/}<br />
                            <h4>Peso</h4>
                            <ul>
                                {
                                    appearance.weight.map((h, index) => (
                                        <li className="style-li" key={index}>{h} &nbsp; &nbsp;</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <h4>Alias</h4>
                    <ul>
                        {
                            biography.aliases.map((h, index) => (
                                <li className="style-li" key={index}>{h}, </li>
                            ))
                        }
                    </ul>
                    <h4 className="card-title">Trabajo</h4>
                    <p className="card-text">{work.occupation}</p>

                </div>
            </div>
        </div>
    )
}
