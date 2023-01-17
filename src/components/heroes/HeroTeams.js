import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { HeroCard } from './HeroCard';


export const HeroTeams = ({ history }) => {
    const [teamOne, setTeamOne] = useState([]);
    const [teamTwo, setTeamTwo] = useState([]);
    const [loading, setLoading] = useState();
    const params = useParams();

    const getTeam = () => {
        if (localStorage.getItem("equipo") && localStorage.getItem("equipo2")) {
            let equipo = JSON.parse(localStorage.getItem("equipo"));
            let equipo2 = JSON.parse(localStorage.getItem("equipo2"));

            setTeamOne(equipo.heroes);
            setTeamTwo(equipo2.heroes)
            console.log(equipo.heroes)
            setLoading(false)
        }
    }

    useEffect(() => {

        getTeam();

    }, []);


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
                                            <h4 style={{ right: '0.5em' }}>{hero.name}</h4>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className='container-teamTwo'>
                            {
                                teamTwo.map(hero => (
                                    <div className='container-hero' style={{ backgroundImage: `url(${hero?.images.md})` }} key={hero.id}>
                                        <div className='container-text'>
                                            <h4 style={{ left: '0.5em' }}>{hero.name}</h4>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>)
            }
        </>


    )

}
