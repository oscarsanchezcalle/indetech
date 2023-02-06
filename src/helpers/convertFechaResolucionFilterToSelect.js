import { format, parseISO } from 'date-fns';

export const convertFechaResolucionFilterToSelect = ( data = []) => {

    const result = [];

    data.map( item => {
        if(item != null && item !='0001-01-01T00:00:00'){
            result.push({ 
                value: item,//format(parseISO(item), 'yyyy-MM-dd'),
                label: format(parseISO(item), 'dd/MM/yyyy')  
            });
        }
    });

    return result;
}