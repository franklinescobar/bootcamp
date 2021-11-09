import React, {useState} from 'react';
import { Formik } from 'formik';

import './FormularioFormik.css'

function FormularioFormik() {
    const [formEnviado, setFormEnviado] = useState(false);
    return (
        <div>
            <Formik
                initialValues={{
                    nombre: "Nombre",
                    correo: "correo@servidor.com"
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    console.log(valores);//Aqui se envian los datos al API del backend
                    setFormEnviado(true);
                    setTimeout(
                        () => setFormEnviado(false),
                        3000
                    )
                }}     
                validate={(valores) => {
                    let errores = {};

                    //validacion nombre
                    if(!valores.nombre) {
                        errores.nombre = "Por Favor ingrese correo"
                    } else if(!/^[a-zA-Z\s]{1,40}$/.test(valores.nombre)) {
                        errores.nombre = "Nombre solo puede contener letras y espacios"
                    }

                    //validacion correo
                    if(!valores.correo) {
                        errores.correo = "Por Favor ingrese correo"
                    } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
                        errores.correo = "Correo invalido"
                    }

                    return errores;
                }}       
            >
                {({handleSubmit, values, handleChange, errors, handleBlur, touched}) => (
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                placeholder="Luis" 
                                value={values.nombre} 
                                onChange={handleChange} 
                                onBlur={handleBlur} />
                                {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <input 
                                type="text" 
                                id="correo" 
                                name="correo" 
                                placeholder="mi.correo@gmail.com" 
                                value={values.correo} 
                                onChange={handleChange} 
                                onBlur={handleBlur} />
                                {touched.correo && errors.correo && <div className="error">{errors.correo}</div>}
                        </div>
                        <button type="submit">Enviar</button>
                        {formEnviado && <p className="exito">Formulario Enviado!</p>}
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default FormularioFormik

