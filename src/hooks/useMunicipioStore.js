import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertMunicipiosToSelect } from '../helpers';
import { isLoadingMunicipios, onLoadMunicipios, resetMunicipios } from '../store';

export const useMunicipioStore = () => {
  
    const dispatch = useDispatch();
    const { municipios, isLoadingMunicipio } = useSelector( state => state.municipio );
    

    const startLoadingMunicipios = async(id) => {
       
        try 
        {
            dispatch( isLoadingMunicipios( true ) );
            
            const { data } = await indetechApi.get('/DepartamentoCiudades/PorDepartamentoId/'+id);
            
            const municipiosForSelect = convertMunicipiosToSelect(data);

            dispatch( onLoadMunicipios( municipiosForSelect ) ); // cierra el loader tambien
            
        } catch (error) 
        {
            dispatch( isLoadingMunicipios( false ) );

        }
    }

    const resetMunicipio = async() => {
        dispatch( resetMunicipios() );
    }
    
    return {
        //* Propiedades
        municipios,
        isLoadingMunicipio,

        //* Métodos
        startLoadingMunicipios,
        resetMunicipio
    }
}
