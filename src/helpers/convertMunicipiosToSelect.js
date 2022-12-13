export const convertMunicipiosToSelect = ( municipios = []) => {

    const result = [];

    municipios.map( municipio => {

        result.push({ value: municipio.id, label: `${municipio.descripcion}` });

    });

    return result;
}