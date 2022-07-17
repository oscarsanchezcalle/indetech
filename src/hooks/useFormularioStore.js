import { useDispatch, useSelector } from 'react-redux';

import 
{ 
    setCajaId, setDependenciaId, setFechaFinal, setFechaInicial, setFolios, setFrecuenciaId,
    setNotas, setOficinaId, setProyectoId, setSerieId, setSoporteId, setSubserieId, setTipoDocumentoId,
    setTomoFinal, setTomoInicial
} from '../store';

export const useFormularioStore = () => {
  
    const dispatch = useDispatch();
    const { fuid } = useSelector( state => state.formularios );
    
    const setFormOficinaId = async(value) => {
        dispatch( setOficinaId(value) );
    }

    return {
        //* Propiedades
        fuid,

        //* Métodos
        setFormOficinaId
        
    }
}

// setCajaId, setDependenciaId, setFechaFinal, setFechaInicial, setFolios, setFrecuenciaId,
        // setNotas, setOficinaId, setProyectoId, setSerieId, setSoporteId, setSubserieId, setTipoDocumentoId,
        // setTomoFinal, setTomoInicial
