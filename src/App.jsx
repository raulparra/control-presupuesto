import { useEffect, useState } from "react";
import { Header } from "./assets/components/Header";
import { Modal } from "./assets/components/Modal";
import  nuevoGasto  from "./img/nuevo-gasto.svg";
import { generarID} from "./assets/helpers";
import { ListadoGastos } from "./assets/components/ListadoGastos";
import { Filtro } from "./assets/components/Filtro";


function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValid, setIsValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarForm, setAnimarForm] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []
  );
  const [gastoEditar, setGastoEditar] = useState({});

const [filtro, setFiltro] = useState('');
const [filtrados, setFiltrados] = useState([]);

  //Local Storage
  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto?? 0))
    
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos)?? []);
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValid(true);
    }
  }, [])
 
  //FIN localStorage

  useEffect(() => {
    if (filtro) {
      //Filtrar gastos por categoría
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setFiltrados(gastosFiltrados)
    }
  }, [filtro])
  
  

  useEffect(() => {
    if (Object.keys( gastoEditar ).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarForm(true);
      }, .500);
    }
  }, [gastoEditar])
  

  const handleNuevoGasto = () =>{

    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
        setAnimarForm(true);
      }, .500);
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState  )
      setGastos(gastosActualizados);
      setGastoEditar({});
    }else{
      //Nuevo gasto
      console.log( gastos );//Lo imprimo para ver qué valor me retorna
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
      console.log( gastos );//Lo imprimo para ver qué valor me retorna y compararlo
    }

      setAnimarForm(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
  }
  
  const eliminarGasto = (id) => {
      const gastosActualizados = gastos.filter ( gasto => gasto.id !== id);
      setGastos( gastosActualizados);
  }
  return (
    <div className= { modal? 'fijar': ''}>
      <Header 
        gastos = { gastos }
        presupuesto = { presupuesto }
        setPresupuesto = { setPresupuesto }
        isValid = { isValid } 
        setIsValid = { setIsValid }
        setGastos = { setGastos }
      />

      {
        isValid && (
          <>
            <main>
              <Filtro
                filtro= { filtro }
                setFiltro= { setFiltro }
              />
              <ListadoGastos 
                gastos = {  gastos }
                setGastoEditar = { setGastoEditar }
                eliminarGasto = { eliminarGasto }
                filtro = { filtro }
                filtrados = { filtrados }
              />
            </main>
            <div className="nuevo-gasto">
              <img 
                src= { nuevoGasto } 
                alt="nuevo gasto" 
                onClick={ handleNuevoGasto }
              />
            </div>
          </>
        )
      }
      { modal && <Modal 
                    setModal = { setModal } 
                    animarForm = { animarForm } 
                    setAnimarForm = { setAnimarForm }
                    guardarGasto = { guardarGasto }
                    gastoEditar = { gastoEditar }
                    setGastoEditar = { setGastoEditar }
                  />}
    </div>
  )
}

export default App
