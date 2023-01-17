import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getById } from '../../services/Axios'



export const HeroScreen = ({ history }) => {

    const [heroData, setHeroData] = useState();
    const [articulo, setArticulo] = useState();
    const [loading, setLoading] = useState();
    const params = useParams();

    const getGenero = (data) => {
        if (data?.appearance?.gender === 'Male') {
            setArticulo(['un', 'la', 'él', 'superhéroe', 'villano'])
        } else {
            setArticulo(['una', 'el', 'ella', 'superhéroina', 'villana'])
        }
    }

    useEffect(() => {
        (async () => {

            const getData = async () => {
                const hero = await getById(params.id);
                setHeroData(hero.data)
                getGenero(hero.data)
                setLoading(false)
            }

            getData();
            if (!heroData) {
                return <Redirect to='/' />
            }
        })();
    }, [heroData, params.id]);


    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();

        }
    }

    const addHero = (hero) => {


        if (localStorage.getItem("equipo") && localStorage.getItem("equipo2")) {
            let equipo = JSON.parse(localStorage.getItem("equipo"));
            let equipo2 = JSON.parse(localStorage.getItem("equipo2"));

            if (equipo.heroes.length === 4 && equipo2.heroes.length === 4) {
                return console.log("quipo completo");
            }

            if (equipo.heroes.length < 4) {

                let arrHero = equipo.heroes.find(f => f.id === hero.id);

                if (arrHero) {
                    console.log("este heroe y existe en el equipo");
                } else {
                    equipo.heroes.push(hero)
                    localStorage.setItem("equipo", JSON.stringify(equipo));
                }
            } else if (equipo.heroes.length === 4 && equipo2.heroes.length < 4) {

                let arrHero = equipo.heroes.find(f => f.id === hero.id);
                let arrHero2 = equipo2.heroes.find(f => f.id === hero.id);

                if (arrHero) {
                    console.log("este heroe y existe en el equipo", `${equipo.name}`);
                } else if (!arrHero2) {

                    equipo2.heroes.push(hero)
                    localStorage.setItem("equipo2", JSON.stringify(equipo2));
                }
            }


        } else {
            //console.log("no hay Heroes en tu equipo");
            let equipo = {
                name: "1",
                heroes: [hero]
            }
            let equipo2 = {
                name: "2",
                heroes: []
            }

            localStorage.setItem("equipo", JSON.stringify(equipo));
            localStorage.setItem("equipo2", JSON.stringify(equipo2));

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
                    (<div className='container-heroScreen'>
                        <div className='container-left'>
                            {
                                (!heroData?.images.lg) ?
                                    (<div className='loading'>
                                        <div className="custom-loader"></div>
                                    </div>)
                                    :
                                    (<img className='img-hero' src={heroData?.images.lg} alt='img-hero' />)
                            }
                        </div>
                        <div className='container-right'>

                            <div className='text-box'>

                                <h2 className='title-data'>{heroData?.name}</h2>

                                <h5 style={{ textTransform: 'capitalize' }}>{(heroData?.biography?.alignment === 'good') ? `${articulo?.[3]} :` : `${articulo?.[4]} :`}</h5>

                                <p>{heroData?.name} es {`${articulo?.[0]}`} {(heroData?.biography?.alignment === 'good') ? `${articulo?.[3]}` : `${articulo?.[4]}`} tambien conocida como {heroData?.biography.aliases[0]}. Su primera aperición fue como {heroData?.biography.firstAppearance}. Su color de ojos {heroData?.appearance.eyeColor}, {(heroData?.appearance.hairColor === ' No  Hair') ? '' : `tiene cabello color ${heroData?.appearance.hairColor} .`}</p>

                                <div className='container-grid'>
                                    <h5>Habilidades:</h5>
                                    <div className='grid'>
                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/brain.png`} alt='brain' />
                                                <span>Inteligencia</span>
                                            </div>
                                            <div className="info-block-value">
                                                {heroData?.powerstats.intelligence}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/strong.png`} alt='strong' />
                                                <span>Fortaleza</span>
                                            </div>
                                            <div className="info-block-value">
                                                {heroData?.powerstats.strength}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/speed.png`} alt='speed' />
                                                <span>Velocidad</span>
                                            </div>
                                            <div className="info-block-value">
                                                {heroData?.powerstats.speed}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/charge.png`} alt='charge' />
                                                <span>Durabilidad</span>
                                            </div>
                                            <div className="info-block-value">
                                                {heroData?.powerstats.durability}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/power.png`} alt='power' />
                                                <span>Poder</span>
                                            </div>
                                            <div className="info-block-value">
                                                {heroData?.powerstats.power}
                                            </div>
                                        </div>

                                        <div className="info-block">
                                            <div className="info-block-label">
                                                <img src={`${process.env.PUBLIC_URL}/assets/icons/combat.png`} alt='combat' />
                                                <span>Combate</span>
                                            </div>
                                            <div className="info-block-value">
                                                {heroData?.powerstats.combat}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='return'>
                                    <button className='btn add' onClick={() => { addHero(heroData) }}>
                                        Añadir {(heroData?.biography?.alignment === 'good') ? `${articulo?.[3]}` : `${articulo?.[4]}`}
                                    </button>
                                    <button className='btn' onClick={handleReturn}>
                                        Volver
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>)}
        </>


    )
}
