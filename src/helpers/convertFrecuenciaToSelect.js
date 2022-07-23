export const convertFrecuenciasToSelect = ( frecuencias = []) => {

    const result = [];

    frecuencias.map( frecuencia => {

        result.push({ value: frecuencia.id, label: frecuencia.descripcion });

    });

    return result;
}