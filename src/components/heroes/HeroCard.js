import React from 'react'
import { useHistory } from 'react-router-dom'

export const HeroCard = ({
    id,
    images,
    name,
    biography,
    powerstats
}) => {

    const history = useHistory();

    const sendInfo = (id) => {
        history.push(`./hero/${id}`);
    }

    return (

        <div className="col" >
            <div className="card" style={{ marginBottom: '1em' }} onClick={() => { sendInfo(id) }}>
                <div className="container-img">
                    <img src={images?.md} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{name} <span>({(biography?.alignment === 'good') ? 'heroe' : 'villano'})</span></h5>
                    <div className="hero-data">
                        <div className="more-info-container">
                            <div className="info-block">
                                <div className="info-block-label">
                                    <img loading='lazy' src={`${process.env.PUBLIC_URL}/assets/icons/brain.png`} alt='brain' />
                                    <span>Inteligencia</span>
                                </div>
                                <div className="info-block-value">
                                    {powerstats?.intelligence}
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="info-block-label">
                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/strong.png`} alt='strong' />
                                    <span>Fortaleza</span>
                                </div>
                                <div className="info-block-value">
                                    {powerstats?.strength}
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="info-block-label">
                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/speed.png`} alt='speed' />
                                    <span>Velocidad</span>
                                </div>
                                <div className="info-block-value">
                                    {powerstats?.speed}
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="info-block-label">
                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/charge.png`} alt='charge' />
                                    <span>Durabilidad</span>
                                </div>
                                <div className="info-block-value">
                                    {powerstats?.durability}
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="info-block-label">
                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/power.png`} alt='power' />
                                    <span>Poder</span>
                                </div>
                                <div className="info-block-value">
                                    {powerstats?.power}
                                </div>
                            </div>

                            <div className="info-block">
                                <div className="info-block-label">
                                    <img src={`${process.env.PUBLIC_URL}/assets/icons/combat.png`} alt='combat' />
                                    <span>Combate</span>
                                </div>
                                <div className="info-block-value">
                                    {powerstats?.combat}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
