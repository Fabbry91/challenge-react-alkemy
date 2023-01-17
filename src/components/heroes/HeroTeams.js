import React, { useEffect, useState } from 'react'


export const HeroTeams = ({ history }) => {
    const [teamOne, setTeamOne] = useState([]);
    const [teamTwo, setTeamTwo] = useState([]);
    const [totalTeam, setTotalTeam] =useState([]);
    const [loading, setLoading] = useState();

    const getTeam = () => {
        if (localStorage.getItem("equipo") && localStorage.getItem("equipo2")) {
            let equipo = JSON.parse(localStorage.getItem("equipo"));
            let equipo2 = JSON.parse(localStorage.getItem("equipo2"));
            setTeamOne(equipo.heroes);
            setTeamTwo(equipo2.heroes)
            setLoading(false)
        }
    }

    useEffect(() => {
        getTeam();
        let obj1 = getTotals(teamOne);
        let obj2 = getTotals(teamTwo);
        setTotalTeam([obj1, obj2])
    }, []);

    const getTotals = (heroes) => {
        const arr = heroes.map((h) => h.powerstats);

        const obj = {
            combat: arr.reduce((acc, val) => acc + val.combat, 0),
            durability: arr.reduce((acc, val) => acc + val.durability, 0),
            intelligence: arr.reduce((acc, val) => acc + val.intelligence, 0),
            power: arr.reduce((acc, val) => acc + val.power, 0),
            speed: arr.reduce((acc, val) => acc + val.speed, 0),
            strength: arr.reduce((acc, val) => acc + val.strength, 0),
        }
        return obj

    }

    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();

        }
    }


    /*const {
        name,
        slug,
        powerstats,
        appearance,
        biography,
        work,
        connections,
        images
    } = heroData;*/

    return (
        <>
            {
                (loading) ?
                    (<div className='loading'>
                        <div className="custom-loader"></div>
                    </div>)
                    :
                    (<div className='container-heroTeam'>
                        <div className='container-teamOne'>
                            {
                                teamOne.map(hero => (
                                    <div className='container-hero' style={{ backgroundImage: `url(${hero?.images.md})` }} key={hero.id}>
                                        <div className='container-text'>
                                            <h4>{hero.name}</h4>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='container-team-data' style={{ display: `${(teamTwo.length > 0) ? 'flex' : 'none'}` }}>
                                
                            <div className='container-grid'>
                                    <div className='grid'>
                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/brain.png`} alt='brain' />
                                                <span>Inteligencia</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[0]?.intelligence}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/strong.png`} alt='strong' />
                                                <span>Fortaleza</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[0]?.strength}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/speed.png`} alt='speed' />
                                                <span>Velocidad</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[0]?.speed}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/charge.png`} alt='charge' />
                                                <span>Durabilidad</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[0]?.durability}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/power.png`} alt='power' />
                                                <span>Poder</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[0]?.power}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/combat.png`} alt='combat' />
                                                <span>Combate</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[0]?.combat}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {
                            <div className='container-vs' style={{ display: `${(teamTwo.length > 0) ? 'flex' : 'none'}` }}>
                                <h1>VS</h1>
                            </div>
                        }

                        <div className='container-teamTwo'>
                            {
                                teamTwo.map(hero => (
                                    <div className='container-hero' style={{ backgroundImage: `url(${hero?.images.md})` }} key={hero.id}>
                                        <div className='container-text'>
                                            <h4>{hero.name}</h4>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='container-team-data' style={{ display: `${(teamTwo.length > 0) ? 'flex' : 'none'}` }}>
                                <h1>VS</h1>
                                <div className='container-grid'>
                                    <div className='grid'>
                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/brain.png`} alt='brain' />
                                                <span>Inteligencia</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[1]?.intelligence}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/strong.png`} alt='strong' />
                                                <span>Fortaleza</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[1]?.strength}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/speed.png`} alt='speed' />
                                                <span>Velocidad</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[1]?.speed}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/charge.png`} alt='charge' />
                                                <span>Durabilidad</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[1]?.durability}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/power.png`} alt='power' />
                                                <span>Poder</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[1]?.power}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/combat.png`} alt='combat' />
                                                <span>Combate</span>
                                            </div>
                                            <div className="info-block-value">
                                                {totalTeam[1]?.combat}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </>


    )

}
