import { useState } from "react"
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ( { presupuesto, setPresupuesto, setIsValid } ) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = ( e ) => {
        e.preventDefault();

        if ( !presupuesto || presupuesto <= 0 )  {
            setMensaje('No es un presupuesto válido');
            return
        }
        setMensaje ('');
        setIsValid( true ); 
    }
    
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form
            onSubmit={ handlePresupuesto }
            className="formulario">
            <div className="campo">
                <label > Definir Presupuesto </label>
                <input 
                    className="nuevo-presupuesto" 
                    placeholder="Añadir presupuesto"
                    type="number"
                    value={ presupuesto }
                    onChange = { e => setPresupuesto( Number(e.target.value) ) }
                />
            </div>
            <input 
                type="submit"
                value= "Añadir"
            />
            { mensaje && <Mensaje tipo = "error"> { mensaje } </Mensaje>}
        </form>
    </div>
  )
}
