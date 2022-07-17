export const convertDependenciasToSelect = ( dependencias = []) => {

    const result = [];

    dependencias.map( dependencia => {

        result.push({ value: dependencia.id, label: `${dependencia.codigo} - ${dependencia.descripcion}` });

    });

    return result;
}