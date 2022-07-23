export const convertVigenciasToSelect = ( vigencias = []) => {

    const result = [];

    vigencias.map( vigencia => {

        result.push({ value: vigencia.id, label: vigencia.descripcion });

    });

    return result;
}