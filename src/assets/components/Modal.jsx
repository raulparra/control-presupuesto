import { useEffect, useState } from "react";
import CerrarBtn from "../../img/cerrar.svg";
import { Mensaje } from "./Mensaje";


export const Modal = ( { setModal, animarForm, setAnimarForm, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
      if (Object.keys( gastoEditar ).length > 0) {
          setNombre( gastoEditar.nombre);
          setCantidad(gastoEditar.cantidad);
          setCategoria(gastoEditar.categoria); 
          setId(gastoEditar.id); 
          setFecha(gastoEditar.fecha);
      }
    }, [])
    

    const ocultarModal = () => {
        setAnimarForm(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if ([ nombre, cantidad, categoria ].includes('')) {
            setMensaje(' TODOS LOS CAMPOS SON OBLIGATORIOS');
            
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }
        guardarGasto({ nombre, cantidad, categoria, id, fecha });
        
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src= { CerrarBtn } 
                alt="cerrar modal" 
                onClick={ ocultarModal }
            />
        </div>
        <form 
            className={ `formulario ${ animarForm ? "animar": 'cerrar' }`}
            onSubmit= { handleSubmit }
        >
            <legend>{ gastoEditar.nombre ? ' Editar Gasto': ' Nuevo Gasto '}  </legend>
            { mensaje && <Mensaje tipo= "error"> { mensaje } </Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder=" Añade un nuevo gasto "
                    value={ nombre }
                    onChange = { e => setNombre(e.target.value) }
                 />
            </div>
            <div className="campo">
                <label htmlFor="nombre">Cantidad</label>
                <input 
                    id="cantidad"
                    type="number"
                    placeholder=" Añade la cantidad "
                    value={ cantidad }
                    onChange = { e => setCantidad(Number(e.target.value)) }
                 />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoría</label>
                <select  
                    id="categoria"
                    value={ categoria }
                    onChange = { e => setCategoria(e.target.value) }
                >
                    <option value="">---Seleccione---</option>    
                    <option value="ahorro">Ahorro</option>    
                    <option value="comida">Comida</option>    
                    <option value="gastos">Gastos Varios</option>    
                    <option value="casa">Casa</option>    
                    <option value="ocio">Ocio</option>    
                    <option value="salud">Salud</option>    
                    <option value="suscripciones">Suscripciones</option>    
                </select>  
            </div>
            <input 
                type="submit" 
                value= { gastoEditar.nombre ? ' Guardar Cambios': ' Añadir Gasto '}
            />
        </form>
    </div>
  )
}
