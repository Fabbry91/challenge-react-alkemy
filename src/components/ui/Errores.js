import React from 'react'

export const Errores = (props) => {
    const { msg } = props
    return (

        <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
            <strong>¡ ERROR ! </strong> &nbsp; {msg}
        </div>
    )
}
