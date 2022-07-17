export const convertSeriesToSelect = ( series = []) => {

    const result = [];

    series.map( serie => {

        result.push({ value: serie.id, label: `${serie.codigo} - ${serie.descripcion}` });

    });

    return result;
}