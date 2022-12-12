export const convertMunicipiosToSelect = ( municipios = []) => {

    const result = [];

    municipios.map( municipio => {

        result.push({ value: municipio.id_municipio, label: `${municipio.municipio}` });

    });

    return result;
}