import { ControlPresupuesto } from "./ControlPresupuesto"
import { NuevoPresupuesto } from "./NuevoPresupuesto"

export const Header = ( { presupuesto, setPresupuesto, isValid, setIsValid, gastos, setGastos }) => {

  return (
    <header>
        <h1>Planificador de gastos</h1>
        {
            isValid? (
                    <ControlPresupuesto 
                      gastos = { gastos }
                      presupuesto = { presupuesto }
                      setGastos = { setGastos }
                      setPresupuesto = { setPresupuesto }
                      setIsValid= { setIsValid }
                    />
                ):( 
                <NuevoPresupuesto
                    presupuesto = { presupuesto }
                    setPresupuesto = { setPresupuesto }
                    isValid = { isValid } 
                    setIsValid = { setIsValid }
                />
                )
        }

    </header>
  )
}
