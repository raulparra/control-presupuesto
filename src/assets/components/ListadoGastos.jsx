import { Gasto } from "./Gasto"

export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, filtrados }) => {
  return (
    <div className="listado-gastos contenedor">
        {
          filtro ? (
            <>
              <h2>{ filtrados.length ? 'Gastos' : 'No hay Gastos en esta categoría' }</h2>
              {filtrados.map( gasto => (
                <Gasto
                    key={ gasto.id }
                    gasto = { gasto } 
                    setGastoEditar = { setGastoEditar }
                    eliminarGasto = { eliminarGasto }
                />
              ))}
            </>
            ): (
              <>
                <h2>{ gastos.length ? 'Gastos' : 'No hay Gastos' }</h2>
                {gastos.map( gasto => (
                    <Gasto
                        key={ gasto.id }
                        gasto = { gasto } 
                        setGastoEditar = { setGastoEditar }
                        eliminarGasto = { eliminarGasto }
                    />
                ))}
              </>
        )
        }
    </div>
  )
}
