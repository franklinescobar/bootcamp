import React from 'react'

const Boton = ({tipo, realizarOperacion}) => {
    return (
        <button onClick={() => {
            realizarOperacion();
        }}>
            {tipo}
        </button>
    )
}

export default Boton

//rafce (enter and create the component)