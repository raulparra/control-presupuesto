import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({ presupuesto, gastos, setPresupuesto, setGastos, setIsValid }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {

      const totalGastado = gastos.reduce( (total, gasto)=> gasto.cantidad + total, 0 );
      const totalDisponible = presupuesto - totalGastado;

      //calcular porcentaje Barra
      const nuevoPorcentaje =( ( ( presupuesto - totalDisponible ) / presupuesto ) * 100 ).toFixed(2);
      setPorcentaje( nuevoPorcentaje );
      setGastado(totalGastado);
      setDisponible (totalDisponible);

    }, [gastos])
   
     const formatoDeMoneda = ( cantidad ) => {
        return cantidad.toLocaleString ('es-MX', {
            style: 'currency',
            currency: 'MXN'
        })
     }

     const handleResetApp = ()=> {
        const resultado = confirm('¿Desea reiniciar gastos y presupuesto?')
        if (resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValid(false);
            

        }
     }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
            styles={ buildStyles ({
                    pathColor: porcentaje > 100 ? 'red': '#3b82f6',
                    trailColor: '#f1f1f1',
                    textColor: porcentaje > 100 ? 'red': '#3b82f6'
                })}
            value={ porcentaje }
            text= { `${porcentaje}% Gastado` }
            />
        </div>
        <div className="contenido-presupuesto">
            <button
                className='reset-app'
                onClick={ handleResetApp }
                type = 'button'
            >
                Reset App
            </button>
            <p>
                <span> Presupuesto: </span> { formatoDeMoneda( presupuesto ) }
            </p>
            <p className= { `${disponible < 0 ? 'negativo': ''}`}>
                <span> Disponible: </span> { formatoDeMoneda( disponible ) }
            </p>
            <p>
                <span> Gastado: </span> { formatoDeMoneda( gastado ) }
            </p>
        </div>
    </div>
  )
}
