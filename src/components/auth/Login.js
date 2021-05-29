import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { generarJWT } from '../../helper/jwt';
import { types } from '../../reducer/types';
import { Errores } from '../ui/Errores';
import { useFormik } from 'formik';
import axios from 'axios';

export const Login = ({ history }) => {

    const { dispatch, initialState } = useContext(UserContext);
    const [error, setError] = useState('');


    //----Formik validador de ingreso de usuario---////
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit(values) {
            //Envio formulario//
            if ('challenge@alkemy.org' === values.email &&
                `${process.env.REACT_APP_INITIALSTATE}` === values.password) {

                getToken(values);

            } else {
                isValid(values);
            }

        },
        validate() {
            //---validador de campos--//
            const errors = {};

            if (formik.touched.email && !formik.values.email) {
                errors.email = "Campo requerido";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)
            ) {
                errors.email = "E-mail invalido";
            }
            if (formik.touched.password && !formik.values.password) {
                errors.password = "Campo requerido";
            } else if (formik.values.password.length <= 3) {
                errors.password = "Deve contener al menos 3 caracteres";
            }
            return errors;

        },
    });

    //---Envio post ingreso errado---///
    const isValid = (values) => {
        axios.post(`${process.env.REACT_APP_LOGIN}`, values)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
               setError("Please provide valid email and password")
            })
    }


    //----metodo que obtienen el token---//
    const getToken = async (values) => {

        const token = await generarJWT('challenge@alkemy.org');
        console.log(token);

        const lastPath = localStorage.getItem('lastPath') || '/';

        const { email } = values;
        dispatch({
            type: types.login,
            payload: {
                email,
                token
            }

        })
        history.replace(lastPath);

    }

    return (
        <div className="login-container p-5">

            <div className="container login-card">

                <div className="row w-100">

                    <div className="col-md-6 col-lg-6 form">

                        <form className="form-group text-center" onSubmit={formik.handleSubmit} noValidate>
                            <h2 className="text-center mt-2"> Login</h2>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label">Email:</label>
                                <div className="col-sm-9">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    <span className="text-danger ">{formik.touched["email"] && formik.errors["email"]}</span>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label">Contraseña:</label>
                                <div className="col-sm-9">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    <span className="text-danger ">{formik.touched["password"] && formik.errors["password"]}</span>
                                </div>
                            </div>
                            <button className="btn btn-primary mb-3" type="submit">Login</button>

                            {
                                error &&
                                <Errores msg={error} />
                            }

                        </form>
                    </div>

                    <div className="col-md-6 col-lg-6">
                            <img src="./assets/img/heroes.png" className="login-img img-fluid" />
                        
                    </div>

                </div>
            </div>
        </div>
    )
}
