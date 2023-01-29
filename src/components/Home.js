import React, { useEffect, useState } from 'react'
import { getHeroes} from '../services/Axios';
import { HeroCard } from './heroes/HeroCard';
export const Home = () => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const setHeroes = async () => {
            let array = [];
            const hero = await getHeroes();
            array = hero.data.slice(0, 20);
            setList(array.sort(() => .5 - Math.random()));
            setLoading(false)
        }
        setHeroes();

    }, []);

    /*
    const hadleDelete = (id) => {
        const newArr = heroCont.filter((h) => h.id !== id);
        setHeroCont(newArr)
    }*/

    return (
        <>
            {(loading) ?

                (<div className='loading'>
                    <div className="custom-loader"></div>
                </div>)
                : (<div className="row row-cols-1 row-cols-sm-3 row-cols-md-4">
                    {
                        list.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero} />
                        ))
                    }
                </div>)
            }
        </>
    )
}
