import jwt from 'jsonwebtoken'

export const generarJWT = (email) => {

    return new Promise((resolve, reject) => {

        const payload = { email };

        jwt.sign(payload, process.env.REACT_APP_SECRET_WORD, {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se puede generar el tokens')
            }

            resolve(token)
        });
    })
}

export const getToken = async () => {
    const token = await generarJWT('challenge@alkemy.org');
    console.log(token);

}