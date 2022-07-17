export const convertSubseriesToSelect = ( subSeries = []) => {

    const result = [];

    subSeries.map( subSerie => {

        result.push({ value: subSerie.id, label: `${subSerie.codigo} - ${subSerie.descripcion}` });

    });

    return result;
}