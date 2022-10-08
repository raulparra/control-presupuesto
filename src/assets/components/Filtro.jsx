
export const Filtro = ({filtro, setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
        <form action="">
            <div className="campo">
                <label htmlFor="gastosF">Filtar Gastos</label>
                <select 
                    value={ filtro }
                    onChange = { e => setFiltro(e.target.value)}>
                    <option value="">---Categorías---</option>    
                    <option value="ahorro">Ahorro</option>    
                    <option value="comida">Comida</option>    
                    <option value="gastos">Gastos Varios</option>    
                    <option value="casa">Casa</option>    
                    <option value="ocio">Ocio</option>    
                    <option value="salud">Salud</option>    
                    <option value="suscripciones">Suscripciones</option>  
                </select>
            </div>
        </form>
    </div>
  )
}
