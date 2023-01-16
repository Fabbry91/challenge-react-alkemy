import { ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { getSearch } from '../../services/Axios'
import { Errores } from './Errores';


export const Search = ({ history }) => {


    const [formValues, setFormValues] = useState({
        name: ""
    })

    const [hero, setHero] = useState([]);
    const [heroTeam, setHeroTeam] = useState([]);
    const [error, setError] = useState('');


    //---Form---//

    const { name } = formValues;

    const handleSearch = (e) => {
        e.preventDefault();
        getHero(name);
    }

    const change = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const getHero = async (name) => {
        const { data } = await getSearch(`${name}`);
        const { results } = data;
        if (isValidate(name, results)) {
            setHero(results);
        }
    }

    const isValidate = (name, results) => {
        if (name.length === 0) {
            return setError('Ingrese una letra');
        }
        if (!results) {
            return setError('No existe personaje con ese nombre');
        }
        setError(null)
        return true
    }


    //----Corrobora Heroes para poder cargarlos al Home----//

    console.log(error);
    const sendInfo = (h) => {

        const heroId = heroTeam.find(resp => resp.id === h.id);
        const heroGood = heroTeam.filter(resp => resp.biography.alignment === "good");
        const heroBad = heroTeam.filter(resp => resp.biography.alignment === "bad");

        if (heroGood.length > 3) {
            return setError("Existen mas de 3 personajes buenos")
        } else {
            setError("")
        }

        if (heroBad.length > 3) {
            return setError("Existen mas de 3 personajes malvados")
        } else {
            setError("")
        }

        if (!heroId) {
            if (heroTeam.length < 6) {

                setHeroTeam([
                    ...heroTeam,
                    h
                ])
                console.log(heroTeam)
            } else {
                setError('El quipo no puede contener mas de 6 personajes');
            }
        } else { setError('Este heroe ya fue cargado') }
    }


    //---borra heroes de la lista de equipos antes de enviarlos al home--//

    const deletItem = (id) => {
        const deleteArray = heroTeam.filter((h) => h.id !== id);
        setHeroTeam(deleteArray);
    }


    //--Asignamos el quipo de herues a contex para tener acceso a los mismos desde el home--//

    const equipoListo = () => {
        history.push("/");
    }

    return (
        <div className="search-component py-4">
            <h2 className="text-white">Buscarcar Heroe</h2>
            <div className="row">
                <div className="col-md-4 col-lg-4">

                    <form autoComplete="off" onSubmit={handleSearch}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={change}
                            />
                            <button className="btn btn-lg btn-outline-success" type="submit">Search</button>
                        </div>
                    </form>

                    <div className="content-team mb-2">

                        {heroTeam.length === 0 ?
                            (<div className="alert alert-warning text-center">
                                <strong>No has seleccionado Heroe para tu Equipo</strong>
                            </div>
                            )
                            :
                            (
                                <div className="card ">
                                    <div className="card-header text-center">
                                        Heroes Seleccionados
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {
                                            heroTeam.map((hT, index) => (
                                                <li key={hT.id} className="list-group-item d-flex justify-content-between ">
                                                    <span className="">{hT.name}</span>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { deletItem(hT.id) }}>X</button>
                                                </li>))
                                        }
                                    </ul>
                                    <button className="btn btn-sm btn-success mb-2" onClick={equipoListo}>Equipo Listo</button>
                                </div>
                            )
                        }

                    </div>


                </div>
                <div className="col-md col-lg">

                    {
                        error &&
                        <Errores msg={error} />
                    }

                    {hero.length === 0 ?
                        (<div className="alert alert-warning text-center">
                            <strong> Busca a tu Heroe o Villano favorito para armar tu equipo</strong>
                        </div>
                        )
                        : (
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {hero.map((h) => (
                                    <div key={h.id} className="col">
                                        <div className="card">
                                            <img src={h.image.url} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{h.name}</h5>
                                                <button className="btn btn-primary" onClick={() => { sendInfo(h) }}>Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}
